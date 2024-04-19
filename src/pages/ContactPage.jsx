import { Col, Container, Row } from 'react-bootstrap';
import Locations from '../components/Locations'; 
import EnquiryForm from '../components/EnquiryForm';

export default function ErrorPage() {
  return (
    <div className='contact-page-bg'>
    <Container fluid>
    <Row>
      <Col lg={12} md={8} className="mb-4"> 
        <Locations />
      </Col>
      <Col lg={12} md={8}  className="mb-4"> 
        <EnquiryForm />
      </Col>
    </Row>
  </Container>
  </div>
  );
}
