import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const pathsToShowLogout = ['/booking', '/profile'];
    setShowLogout(pathsToShowLogout.includes(location.pathname));
  }, [location]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
       <Navbar className="bg-light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h1 style={{ color: '#c8102e', margin: 0, fontSize: '2.5rem', fontWeight: 'bold', fontStyle: 'italic' }}>
            <i className="bi bi-moon-fill me-1"></i>MOONWAY HOSPITALS
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* ms-auto will push the nav to the right */}
            <Nav.Link as={NavLink} to="/" exact style={{ marginRight: '10px', fontSize: '1.2rem' }}><i className="bi bi-house me-2"></i>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/booking" style={{ marginRight: '10px', fontSize: '1.2rem' }}><i className="bi bi-card-checklist me-2"></i>Booking</Nav.Link>
            <Nav.Link as={NavLink} to="/profile" style={{ marginRight: '10px', fontSize: '1.2rem' }}><i className="bi bi-person-circle me-2"></i>Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" style={{ marginRight: '10px', fontSize: '1.2rem' }}><i className="bi bi-telephone-fill me-2"></i>Contact</Nav.Link>
          </Nav>
          {showLogout &&
            <Button variant="outline-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</Button>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Outlet />
    </>
  )
  
}
