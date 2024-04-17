import { Col, Container, Button, Row } from 'react-bootstrap';
import Locations from '../components/Locations'; // Assuming you're using react-router for navigation
import EnquiryForm from '../components/EnquiryForm';

export default function ErrorPage() {
  return (
    <Container fluid>
    <Row>
      <Col md={8} md={12} className="mb-4"> {/* Adjust the size as needed */}
        <Locations />
      </Col>
      <Col md={4}  md={12} className="mb-4"> {/* Adjust the size as needed */}
        <EnquiryForm />
      </Col>
    </Row>
  </Container>
  );
}
