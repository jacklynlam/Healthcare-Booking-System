import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { Alert, Button, Card, Modal, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';

export default function AuthPage() {
    const url = 'https://ca9c67d4-baee-40ef-bf05-7e2bc6af30a2-00-31ncxb5xkwizx.janeway.replit.dev';

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

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!isPasswordStrong(password)) {
            setPasswordError("Password must be at least 8 characters long and include uppercase and lowercase letters, numbers and special characters.");
            return; // Prevent the sign-up process from continuing
        }
        try {
            console.log('Attempting to create user...');
            const res = await createUserWithEmailAndPassword(auth, username, password);
            console.log('User created:', res.user);
            const { uid, email } = res.user;

            console.log('Sending UID and email to backend...');
            const res2 = await axios.post(`${url}/signup`, { uid, email });
            console.log('Backend response:', res2.data);

            if (res2.data && res2.data.auth === true && res2.data.token) {
                console.log('Setting authToken in localStorage', res2.data.token);
                localStorage.setItem('authToken', res2.data.token)

                toast.success("Account created successfully. You are now logged in!", {
                    autoClose: 2000,
                    position: "top-center",

                });
                navigate('/booking');
            } else {
                console.error('Auth token not provided or auth failed:', res2.data);
                toast.error(res2.data.message || "Failed to authenticate. Please log in.", {
                    autoClose: 2000,
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error('Signup error:', error);
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
            const res2 = await axios.post(`${url}/login`, { uid, email });
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

            if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email format.", {
                    autoClose: 2000,
                    position: "top-center",
                });
            } else if (error.code === 'auth/user-not-found') {
                toast.error("User not found. Please check your email.", {
                    autoClose: 2000,
                    position: "top-center",
                });
            } else if (error.code === 'auth/wrong-password') {
                toast.error("Incorrect password. Please try again.", {
                    autoClose: 2000,
                    position: "top-center",
                });
            } else {
                toast.error("Error logging in!", {
                    autoClose: 2000,
                    position: "top-center",
                });
            }
        }
    }

    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        const gProvider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, gProvider);
            if (res.user) {
                const { uid, email } = res.user;
                const res2 = await axios.post(`${url}/login`, { uid, email });
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
    }

    const handleClose = () => {
        setModalShow(null);
        setPasswordError("");
    };

    return (
        <Card className=" text-center m-4 p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '15px' }}>
            <Card.Body>
                <Card.Title as="h2" className="mb-4" style={{ color: '#007bff', fontWeight: "bold" }}>Hospital Appointment System</Card.Title>
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
        </Card>)
}