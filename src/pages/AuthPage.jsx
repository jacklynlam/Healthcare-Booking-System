import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    } from 'firebase/auth';
import { Alert, Button, Card, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            navigate('/booking');
        }
    }, [currentUser, navigate]);

    /*useEffect(() => {
        if (modalShow === 'PhoneLogin') {
            const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
            recaptchaVerifier.render();
        }
    }, [modalShow, auth]); */


    useEffect(() => {
        console.log(authToken)
    }, [authToken])

    const isPasswordStrong = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChar
        );
    };

   /* const handleAuthToken = async ({ uid, email }) => {
        try {
            const response = await axios.post('https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev/login', { uid, email });
            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                setAuthToken(response.data.token); // Update state as well, assuming you'll use this in your context or elsewhere
                navigate('/booking');
            } else {
                console.error('Token was not provided by the backend.');
                // Handle case where token is not provided
            }
        } catch (error) {
            console.error('Error during auth token retrieval:', error);
            // Handle/display the error appropriately
        }
    }; */
    

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!isPasswordStrong(password)) {
            setPasswordError("Password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and special characters.");
            return; // Prevent the sign-up process from continuing
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, username, password);
            console.log(res);
            const { uid, email } = res.user;
            const res2 = await axios.post(`https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev/signup`, { uid, email });
            if (res2.data && res2.data.auth === true && res2.data.token) {
                console.log('Setting authToken in localStorage', res2.data.token);
                localStorage.setItem('authToken', res2.data.token)
            }
            toast.success("Account created successfully", {
                autoClose: 2000,
                position: "top-center",
              });
            } catch (error) {
            console.error(error);
            toast.error("Error creating account", {
                autoClose: 2000,
                position: "top-center",
              });
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, username, password);
            const { uid, email } = res.user;
            const res2 = await axios.post(`https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev/login`, { uid, email });
            console.log((res2));
            if (res2.data && res2.data.auth === true && res2.data.token) {
                localStorage.setItem('authToken', res2.data.token);
                console.log(res2.data.token);
                toast.success("Logged in successfully!", {
                    autoClose: 2000,
                    position: "top-center",
                  });

            }
           } catch (error) {
            console.error(error);
            toast.error("Error logging in!", {
                autoClose: 2000,
                position: "top-center",
              });
        }
    };
    const handleClose = () => {
        setModalShow(null);
        setPasswordError("");
    };

    /* const handleFacebookLogin = async (event) => {
         event.preventDefault();
         const fProvider = new FacebookAuthProvider();
         try {
             const res = await signInWithPopup(auth, fProvider);
             if (res.user) {
                 const { uid, email } = res.user;
                 // Attempt to post to your backend
                 const res2 = await axios.post(`https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev/login`, { uid, email });
                 // Check for expected auth token in the response
                 if (res2.data && res2.data.auth === true && res2.data.token) {
                     localStorage.setItem('authToken', res2.data.token);
                 }
             } 
         } catch (error) {
             console.error('Error during the login process:', error); // Log any errors
         }
     };
     */

    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        const gProvider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, gProvider);
            if (res.user) {
                const { uid, email } = res.user;
                const res2 = await axios.post(`https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev/login`, { uid, email });
                if (res2.data && res2.data.auth === true && res2.data.token) {
                    localStorage.setItem('authToken', res2.data.token);
                    toast.success("Logged in successfully!", {
                        autoClose: 2000,
                        position: "top-center",
                      });
                }
               }
        } catch (error) {
            console.error('Error during the login process:', error); 
            toast.error("Error logging in!", {
                autoClose: 2000,
                position: "top-center",
              });
        }
    };

    return (
        <div className="auth-page-bg">
            <Container>
                <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                    <Col lg={8} md={6}>
                        <Card className=" text-center m-4 p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '15px' }}>
                            <Card.Body>
                                <Card.Title as="h2" className="mb-4" style={{ color: '#007bff', fontWeight: "bold" }}>Hospital Appointment System</Card.Title>

                                {/* Replace Twitter icon with appropriate hospital-related icon */}
                                <i className="bi bi-hospital" style={{ fontSize: 50, color: "#007bff" }}></i>

                                <p className="mt-4" style={{ fontSize: '1.5rem', fontWeight: "bold" }}>Access Your Health Records</p>
                                <p className="mb-4">Sign in to manage your appointments.</p>

                                <Form className="d-grid gap-3">
                                    <Button variant="primary" size="lg" className="rounded-pill" onClick={handleGoogleLogin}>
                                        <i className="bi bi-google"></i> Log in with Google
                                    </Button>
                                    <div className="text-muted">or</div>

                                    <Button variant="info" size="lg" className="rounded-pill" onClick={handleShowSignUp}>
                                        Create an account
                                    </Button>
                                    <p style={{ fontSize: "0.9rem" }}>
                                        By signing up, you agree to Moonway&#39;s Hospitals&#39; Terms of Service and Privacy Policy, including cookie use.
                                    </p>

                                    <hr />

                                    <p className="mb-0" style={{ fontWeight: "bold" }}>
                                        Already have an account?
                                    </p>
                                    <Button variant="outline-primary" size="lg" className="rounded-pill" onClick={handleShowLogin}>
                                        Sign In
                                    </Button>
                                </Form>
                            </Card.Body>

                            <Modal
                                show={modalShow !== null}
                                onHide={handleClose}
                                animation={false}
                                centered
                            >
                                <Modal.Body>
                                    <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                                        {modalShow === "SignUp" ? "Create your account" : "Log in to your account"}
                                    </h2>
                                    {passwordError && <Alert variant="danger">{passwordError}</Alert>} {/* Display password error */}

                                    <Form
                                        className="d-grid gap-2 px-5"
                                        onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                                    >
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                onChange={(event) => setUsername(event.target.value)}
                                                type="email"
                                                placeholder="Enter email"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control
                                                onChange={(event) => setPassword(event.target.value)}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Group>
                                        <p style={{ fontSize: "12px" }}>
                                            By signing up, you consent to Moonway&#39;s Hospitals&#39; Terms of Service and Privacy Policy, which includes our use of cookies to enhance your experience. We are commited to maintaining the confidentiality and security of your personal information. Moonway Hospitals may utilise your contact details, such as email address and phone number, solely for purposes specified in our Privacy Policy. This includes but is not limited to ensuring your account&#39;s security, personalising services, and, with your consent, sending updates and promotional offers that may interest you.
                                        </p>

                                        <Button className="rounded-pill" type="submit">
                                            {modalShow === "SignUp" ? "Sign up" : "Log in"}
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}