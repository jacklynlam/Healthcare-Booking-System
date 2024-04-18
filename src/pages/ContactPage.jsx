import { Col, Container, Row } from 'react-bootstrap';
import Locations from '../components/Locations'; 
import EnquiryForm from '../components/EnquiryForm';

export default function ErrorPage() {
  return (
    <Container fluid>
    <Row>
      <Col lg={12} className="mb-4"> 
        <Locations />
      </Col>
      <Col md={4}  className="mb-4"> 
        <EnquiryForm />
      </Col>
    </Row>
  </Container>
  );
}
