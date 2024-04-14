import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Locations from '../components/Locations';

export default function WelcomePage() {
    const navigate = useNavigate();

    const goToAuth = () => {
        navigate('/login');
    };

    return (
        <div className="welcome-page-bg" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Container className="d-flex justify-content-center align-items-start p-5" style={{ flex: '1 0 auto' }}>
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
                        At Moonway Hospitals, we believe in providing exceptional care with ease and precision. 
                    </p>
                    <Button onClick={goToAuth} variant="primary" size="lg">
                        Book an Appointment Today
                    </Button>
                </div>
            </Container>
            <Container style={{ padding: '30px 0', backgroundColor: '#f7f7f7', textAlign: 'center', borderRadius: '15px' }}>
                <Locations />
            </Container>
        </div>
    );
}
