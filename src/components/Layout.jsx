import { NavLink, Outlet } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);  // Set to true if user is not null, otherwise false
    });
    return () => unsubscribe();  // Cleanup the subscription
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');  // Redirect to login after logout
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  };

  const handleLogin = () => {
    navigate('/login');  // Navigate to the login page
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
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" exact style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                <i className="bi bi-house me-2"></i>Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/finddoctor" style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                <i className="bi bi-person me-2"></i>Find a Doctor
              </Nav.Link>
              {isLoggedIn && (
                <>
                  <Nav.Link as={NavLink} to="/booking" style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                    <i className="bi bi-card-checklist me-2"></i>Booking
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile" style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                    <i className="bi bi-person-circle me-2"></i>Profile
                  </Nav.Link>
                </>
              )}
              
              <Nav.Link as={NavLink} to="/contact" style={{ marginRight: '10px', fontSize: '1.2rem' }}>
                <i className="bi bi-telephone-fill me-2"></i>Contact
              </Nav.Link>
              {isLoggedIn ? (
                <Button variant="outline-danger" onClick={handleLogout} style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </Button>
              ) : (
                <Button variant="primary" onClick={handleLogin} style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>Log In
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
