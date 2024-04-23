import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ChatbotModal from '../components/ChatbotModal';
import { useState } from 'react';


export default function WelcomePage() {
    const navigate = useNavigate();

    const goToAuth = () => {
        navigate('/login');
    };

    const goToFindDoctor = () => {
        navigate('/finddoctor');
    };

    const [showChatbot, setShowChatbot] = useState(false);

    const handleCloseChatbot = () => setShowChatbot(false);
    const handleShowChatbot = () => setShowChatbot(true);

    return (
        <div className="d-flex flex-col welcome-page-bg vh-100">
            <Container className="d-flex justify-content-center align-items-center p-5" style={{ flex: '1 0 auto' }}>
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
                    <Button className="mt-4"
                        onClick={goToFindDoctor} variant="primary" size="lg">
                        Find a Moonway Hospital Doctor
                    </Button>
                    
                    </div>
            </Container>
            <ChatbotModal show={showChatbot} handleClose={handleCloseChatbot} />
            <div className="align-self-end p-5">
                <div className='d-flex justify-content-center align-items-center rounded-circle border border-solid pb-2' style={{ width: '75px', height: '75px', backgroundColor: '#CF2E2E', cursor: 'pointer'}}>
                    <i className="bi bi-chat-dots fs-1" style={{ color: 'white'}} 
                    onClick={handleShowChatbot}></i>
                </div>
            </div>
            </div>                
       
    );
}
