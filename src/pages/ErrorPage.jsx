import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

export default function ErrorPage() {
  return (
    <div style={{ padding: '50px 0', textAlign: 'center', backgroundColor: '#f7f7f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Container>
        <h1 style={{ marginBottom: '20px', fontSize: '48px', color: '#0a58ca' }}>Oops!</h1>
        <h2 style={{ marginBottom: '20px' }}>We can&#39;t seem to find the page you&#39;re looking for.</h2>
        <p style={{ marginBottom: '30px' }}>Error code: 404</p>
        <p>Here are some helpful links instead:</p>
        <div>
          <Button variant="primary" as={Link} to="/" style={{ margin: '0 10px' }}>Home</Button>
          <Button variant="outline-secondary" as={Link} to="/appointments" style={{ margin: '0 10px' }}>My Appointments</Button>
          <Button variant="outline-secondary" as={Link} to="/contact" style={{ margin: '0 10px' }}>Contact Us</Button>
        </div>
      </Container>
    </div>
  );
}
