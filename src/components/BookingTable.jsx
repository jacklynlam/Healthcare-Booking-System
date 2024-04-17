import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BookingR from './BookingR';
import EditBookingModal from './EditBookingModal';
import DeleteBookingModal from './DeleteBookingModal';

export default function BookingTable() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState({});
    const [bookingStatus, setBookingStatus] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBookingId, setDeleteBookingId] = useState(null);

    const authToken = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(authToken);
    const isAdmin = decodedToken.isAdmin; 
    console.log(decodedToken);


    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const url = 'https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev';  

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            fetchBookings();
        }
    }, [currentUser, navigate]);

    const fetchBookings = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${url}/booking/${currentUser?.id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setBookings(response.data);
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message;
            setError(`Failed to fetch bookings: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (booking) => {
        setCurrentBooking({ ...booking, isAdmin });
        setBookingStatus(booking.status);
        setShowEditModal(true);
        console.log('IsAdmin:', isAdmin)
        console.log('Editing booking:', booking)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentBooking({ ...currentBooking, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with:', currentBooking);
        const bookingData = {
            ...currentBooking,
            status: bookingStatus,
        };

        try {
            await axios.put(`${url}/booking/${currentBooking.booking_id}`, bookingData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setShowEditModal(false);
            fetchBookings();  // Refetch bookings to update the list
        } catch (error) {
            console.error("Failed to update booking:", error.response ? error.response.data.message : error.message);
        }
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
                },
            });
            setBookings(bookings.filter(booking => booking.booking_id !== deleteBookingId));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Failed to delete booking:", error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div>
            <div style={{ marginTop: '20px' }}>
                {loading ? <Spinner animation="border" /> : error ? <Alert variant="danger">{error}</Alert> : (
                  
                    <Table striped bordered hover size="sm" responsive className="text-center">
                        <thead className="thead-dark">
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
                            {bookings.map(booking => (
                                <BookingR 
                                key={booking.booking_id} 
                                booking={booking} 
                                openEditModal={openEditModal} 
                                openDeleteModal={openDeleteModal} 
                                isAdmin={isAdmin}
                                currentUserId={currentUser.id}
                                />
                            ))}
                        </tbody>
                    </Table>
                    
                )}
            </div>
            
            <EditBookingModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                booking={currentBooking}
                status={bookingStatus}
                onStatusChange={(e) => setBookingStatus(e.target.value)}
                onSubmit={handleEditSubmit}
                onInputChange={handleInputChange}
                isAdmin={isAdmin}
                currentUser={currentUser}
                canEditAll={isAdmin && currentBooking.userId === currentUser.id}
            />
            <DeleteBookingModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDelete={deleteBooking}
            />
        </div>
    );
}


/*import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BookingR from './BookingR';
import EditBookingModal from './EditBookingModal';
import DeleteBookingModal from './DeleteBookingModal';

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({});
  const [bookingStatus, setBookingStatus] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);

  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  const isAdmin = decodedToken.isAdmin;

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const url = 'https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev';

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      fetchBookings();
    }
  }, [currentUser, navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${url}/booking/${currentUser?.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      const message = error.response ? error.response.data.message : error.message;
      setError(`Failed to fetch bookings: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (booking) => {
    setCurrentBooking({ ...booking, isAdmin });
    setBookingStatus(booking.status);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking({ ...currentBooking, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...currentBooking,
      status: bookingStatus,
    };

    try {
      await axios.put(`${url}/booking/${currentBooking.booking_id}`, bookingData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setShowEditModal(false);
      fetchBookings();  // Refetch bookings to update the list
    } catch (error) {
      console.error("Failed to update booking:", error.response ? error.response.data.message : error.message);
    }
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
        },
      });
      setBookings(bookings.filter(booking => booking.booking_id !== deleteBookingId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete booking:", error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        {loading ? <Spinner animation="border" /> : error ? <Alert variant="danger">{error}</Alert> : (
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
              {bookings.map(booking => (
                <BookingR
                  key={booking.booking_id}
                  booking={booking}
                  openEditModal={openEditModal}
                  openDeleteModal={openDeleteModal}
                  isAdmin={isAdmin}
                  currentUserId={currentUser.id}
                />
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <EditBookingModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        booking={currentBooking}
        status={bookingStatus}
        onStatusChange={(e) => setBookingStatus(e.target.value)}
        onSubmit={handleEditSubmit}
        onInputChange={handleInputChange}
        isAdmin={isAdmin}
        currentUser={currentUser}
      />
      <DeleteBookingModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={deleteBooking}
      />
    </div>
  );
}


*/