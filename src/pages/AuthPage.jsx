import { Col, Container, Row } from 'react-bootstrap';
import WelcomeModal from '../components/WelcomeModal';

export default function AuthPage() {
    return (
        <div className="auth-page-bg">
            <Container>
                <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                    <Col lg={8} md={6}>
                        
                            <WelcomeModal/>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}