import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Locations from '../components/Locations'; // Assuming you're using react-router for navigation

export default function ErrorPage() {
  return (
    <div style={{ padding: '30px 0', textAlign: 'center', backgroundColor: '#f7f7f7', minHeight: '150vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Container>
        <Locations/>
      </Container>
    </div>
  );
}
