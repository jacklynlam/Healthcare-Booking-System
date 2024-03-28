import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
const navigate = useNavigate(); 

const goToAuth = () => {
    navigate('/login');
}
return (
    <div className="welcome-page-bg">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center p-5" style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          color: 'white', 
          borderRadius: '15px', 
          maxWidth: '600px', 
        }}>
          <h1 className="mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Welcome to Moonway Hospitals
          </h1>
          <p className="mb-4">
            Your health is our utmost priority. 
                        
            At Moonway Hospitals, we believe in providing exceptional care with ease and precision. Join our community today to manage your health appointments seamlessly and take the first step towards a healthier future.
          </p>
          <Button onClick={goToAuth} variant="primary" size="lg">
            Make an Appointment
          </Button>
        </div>
      </Container>
    </div>
);
}