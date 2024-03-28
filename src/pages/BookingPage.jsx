import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, setHours, setMinutes, addDays } from "date-fns";
import { toast } from 'react-toastify';

export default function BookingPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();

  const startDate = setHours(setMinutes(new Date(), 0), 9);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  const [form, setForm] = useState({
    patientName: '',
    location: '',
    service: '',
    doctor: '',
    bookingDate: '',
    bookingTime: '',
    contactNumber: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true before making API call

    if (!selectedDate) {
      alert("Please select a booking date and time.");
      setLoading(false);
      return;
    }
    const bookingDate = format(selectedDate, 'yyyy-MM-dd'); // Format date as YYYY-MM-DD
    const bookingTime = format(selectedDate, 'HH:mm'); // Format time as HH:MM

    console.log('Formatted booking_date:', bookingDate);
    console.log('Formatted booking_time:', bookingTime);

    // Create a new object that includes the formatted bookingDate
    const submissionData = {
      ...form,
      bookingDate: bookingDate,
      bookingTime: bookingTime // Replace the bookingDate with the formatted date
    };

    console.log('Submission Data:', submissionData);

    const authToken = localStorage.getItem('authToken');
    console.log('Auth Token:', authToken);

    if (!authToken) {
      alert("No auth token found. Please log in again.");
      setLoading(false);
      navigate('/login');
      return; // Stop the function if there is no token
    }

    console.log(('Submission Data:', submissionData));

    // Get token from local storage
    try {
      const response = await axios.post(
        "https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev/booking",
        submissionData, // Pass form data as the request body
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json', // Include the token in the request headers
          },
        }
      );
      console.log(response);
      toast.success("Booking submitted successfully!", {
        autoClose: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error submitting booking!", {
        autoClose: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false); // Set loading to false when the API call completes
    }
  };

  return (
    <div className="booking-page-bg">
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <Col lg={10} md={6}>
            <Card className="m-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '15px' }}>
              <Card.Header as="h5" className="text-center bg-primary text-white">Book an Appointment</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control type="text" name="patientName" value={form.patientName} onChange={handleChange} placeholder="Enter patient name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" name="location" value={form.location} onChange={handleChange}>
                      <option value="" disabled selected>Select a location</option>
                      <option value="Damansara">Damansara</option>
                      <option value="Subang Jaya">Subang Jaya</option>
                      <option value="Penang">Penang</option>
                      <option value="Malacca">Malacca</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Service</Form.Label>
                    <Form.Control as="select" name="service" value={form.service} onChange={handleChange}>
                    <option value="" disabled selected>Select a service</option>
                      <option value="Anaesthesiology and Critical Care">Anaesthesiology and Critical Care</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dentistry">Dentistry</option>
                      <option value="Gynaecology">Gynaecology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Paediatrics">Paediatrics</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="Urology">Urology</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Control as="select" name="doctor" value={form.doctor} onChange={handleChange}>
                    <option value="" disabled selected>Select a doctor</option>
                      <option value="Dr Anis Zulaikha">Dr Anis Zulaikha</option>
                      <option value="Dr Aadli Nadzmi">Dr Aadli Nadzmi</option>
                      <option value="Dr Benjamin Bong">Dr Benjamin Bong</option>
                      <option value="Dr Heng Ren Qiu">Dr Heng Ren Qiu</option>
                      <option value="Dr Mohd Azri">Dr Mohd Azri</option>
                      <option value="Dr Ng Chi Seong">Dr Ng Chi Seong</option>
                      <option value="Dr Raymond Kong">Dr Raymond Kong</option>
                      <option value="Dr Suriah Selvam">Dr Suriah Selvam</option>
                      </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Booking Date</Form.Label>
                    <DatePicker
                      style={{ width: "auto" }}
                      selected={selectedDate}
                      onChange={handleDateChange}
                      showTimeSelect
                      filterTime={filterPassedTime}
                      timeIntervals={60}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Select date and time"
                      minDate={addDays(currentDate, 1)}
                      minTime={setHours(setMinutes(new Date(), 0), 9)}
                      maxTime={setHours(setMinutes(new Date(), 30), 20)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Enter contact number" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} placeholder="Enter appointment details" />
                  </Form.Group>
                  <div className="d-grid">
                    {loading ? (
                      <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
                                          ) : (
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
