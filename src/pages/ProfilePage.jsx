import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { AuthContext } from '../components/AuthProvider';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdminEditModal, setShowAdminEditModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({});
  const [bookingStatus, setBookingStatus] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  
  useEffect(() => {
    if (currentUser && authToken) {
      console.log("Current User", currentUser);
      fetchBookings();
    } else {
          navigate('/login');
    }
  }, [currentUser?.id, authToken, navigate]);
  
  const url = "https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev";
  
  const fetchBookings = async () => {
    if (!currentUser?.id) return;

    try {
      setLoading(true);
      const response = await axios.get(`${url}/booking/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      const formattedBookings = response.data.map(booking => ({
        ...booking,
        booking_date: format(new Date(booking.booking_date), 'yyyy-MM-dd'),
      }))
      setBookings(formattedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setError(`Failed to fetch bookings: ${error.response ? (error.response.data.error || JSON.stringify(error.response.data)) : error.message}`);
    } finally {
      setLoading(false);
    }
  };
   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking({ ...currentBooking, [name]: value });
  };

  const openDeleteModal = (bookingId) => {
    setDeleteBookingId(bookingId);
    setShowDeleteModal(true);
  };

  const deleteBooking = async () => {
    try {
      await axios.delete(`${url}/booking/${deleteBookingId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      setBookings(bookings.filter(booking => booking.booking_id !== deleteBookingId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete booking", error.response ? error.response.data : error.message);
    }
  };

  const openEditModal = (booking) => {
    setCurrentBooking(booking);
    setShowEditModal(true);
  };

  const openAdminEditModal = (booking) => {
    setCurrentBooking(booking);
    setBookingStatus(booking.status);
    setShowAdminEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      patient_name: currentBooking.patient_name,
      contact_number: currentBooking.contact_number,
      email: currentBooking.email,
      description: currentBooking.description,
      status: currentBooking.status,
    };

    /* if (currentUser.isAdmin && 'status' in currentBooking) {
       bookingData.status = currentBooking.status;
     } */

    try {
      await axios.put(
        `${url}/booking/${currentBooking.booking_id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setShowEditModal(false); // Close the modal on success
      fetchBookings(); // Refetch bookings to update the UI
    } catch (error) {
      console.error("Failed to update booking", error.response ? error.response.data : error.message);
    }
  };

  const handleAdminEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${url}/booking/${currentBooking.booking_id}`,
        { status: bookingStatus },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setShowAdminEditModal(false);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking status", error.response ? error.response.data : error.message);
    }
  };
  return (
    <div>
      <div style={{ marginTop: '20px' }}></div>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <Table striped bordered hover responsive="sm" className="professional-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Location</th>
              <th>Service</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.patient_name}</td>
                <td>{booking.location}</td>
                <td>{booking.service}</td>
                <td>{booking.doctor}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.booking_time}</td>
                <td>{booking.contact_number}</td>
                <td>{booking.email}</td>
                <td>{booking.description}</td>
                <td>{booking.status}</td>
                <td>
                  <Button variant="primary" onClick={() => openEditModal(booking)}>Edit</Button>
                  {' '}
                  {currentUser.isAdmin && (
                    <Button variant="info" onClick={() => openAdminEditModal(booking)}>Edit Status</Button>
                  )}
                  {' '}
                  <Button variant="danger" onClick={() => openDeleteModal(booking.booking_id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="patient_name"
                required
                value={currentBooking.patient_name || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Repeat the pattern for each field */}
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact_number"
                value={currentBooking.contact_number || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentBooking.email || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentBooking.description || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAdminEditModal} onHide={() => setShowAdminEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdminEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteBooking}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}