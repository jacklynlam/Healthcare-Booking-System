import { useState } from 'react';
import { Form, Button, Container, Col, Card, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EnquiryForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would usually send the data to a server or an API endpoint
        console.log('Form data submitted:', formData);
        alert("Thank you for your enquiry. We will get back to you shortly.");
        setFormData({name: '', email: '', phone: '', message: ''});  // Clear form
    };

    return (
        <Container>
          <Row className="justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
<Col lg={12} md={8}>
  <Card className="m-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '15px' }}>
    <Card.Header as="h4" className="text-center bg-primary text-white">Contact Us</Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            />
            <Form.Label className="mt-2">Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
            <Form.Label className="mt-2">Contact Number</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            />
        <Form.Group className="mb-3" controlId="message">
          <Form.Label className="mt-2">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
  );
}

