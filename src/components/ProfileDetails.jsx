import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";  
import { AuthContext } from "../components/AuthProvider";
import { Card, Col, Row } from 'react-bootstrap';

export default function Profile() {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',  // Initialize email state
        photoURL: '',
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        } else {
            setFormData({
                username: currentUser.displayName || '',
                email: currentUser.email, 
                photoURL: currentUser.photoURL || '',
            });
        }
    }, [currentUser, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFormData(prevState => ({
                ...prevState,
                photoURL: URL.createObjectURL(file)  // Create a local URL for preview purposes
            }));
        }
    };

    const uploadProfilePicture = async () => {
        if (!file) return;
        const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
        try {
            const uploadTaskSnapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error('Failed to upload profile picture: ', error);
            toast.error("Failed to upload profile picture.", {
                autoClose: 2000,
                position: "top-center",
              });
            throw new Error('Failed to upload profile picture');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let photoURL = formData.photoURL;  // Use existing URL unless a new file was uploaded

        if (file) {
            try {
                photoURL = await uploadProfilePicture();  // Upload and get new URL
                setFormData(prevState => ({ ...prevState, photoURL }));
            } catch (error) {
                toast.error("Failed to upload profile picture: " + error.message);
                setLoading(false);
                return;  // Exit if upload fails
            }
        }

        if (formData.username !== currentUser.displayName || photoURL !== currentUser.photoURL) {
            try {
                await updateProfile(currentUser, { displayName: formData.username, photoURL });
                toast.success("Profile updated successfully!", {
                    autoClose: 2000,
                    position: "top-center",
                  });
            } catch (error) {
                console.error('Failed to update Firebase Auth profile:', error);
                toast.error("Failed to update profile: " + error.message, {
                    autoClose: 2000,
                    position: "top-center",
                  });
            }
        }

        setLoading(false);
        navigate("/profile");  // Navigate to profile page or dashboard as needed
    };

    return (
        <div className="container mt-3">
            <Row className="justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
                <Col lg={10} md={6}>
                    <Card className="m-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '15px' }}>
                        <Card.Header as="h4" className="text-center bg-primary text-white">Profile</Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="photoURL" className="form-label">Profile Picture</label>
                                    <input type="file" className="form-control" id="photoURL" onChange={handleImageChange} />
                                    {formData.photoURL && (
                                        <img src={formData.photoURL} alt="Profile" className="img-thumbnail mt-2 centered" style={{ width: "200px", height: "200px" }} />
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email (cannot be changed)</label>
                                    <input type="email" className="form-control" id="email" value={formData.email} readOnly />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? "Updating..." : "Update Profile"}
                                </button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
