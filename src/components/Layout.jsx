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
            <i className="bi bi-moon-fill"></i>MOONWAY HOSPITALS
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* ms-auto will push the nav to the right */}
            <Nav.Link as={NavLink} to="/" exact style={{ marginRight: '10px', fontSize: '1.2rem' }}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/booking" style={{ marginRight: '10px', fontSize: '1.2rem' }}>Booking</Nav.Link>
            <Nav.Link as={NavLink} to="/profile" style={{ marginRight: '10px', fontSize: '1.2rem' }}>Profile</Nav.Link>
          </Nav>
          {showLogout &&
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Outlet />
    </>
  )
  
}
