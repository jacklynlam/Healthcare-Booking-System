import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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
        <Container className="mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
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
    </Container>
  );
}

