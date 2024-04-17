import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import { AuthContext } from "../components/AuthProvider";

export default function Profile() {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '', // Initialize as empty string, will update from currentUser in useEffect
        photoURL: '',
        contactNumber: '',
        insuranceDetails: ''
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        } else {
            const loadProfile = async () => {
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setFormData({
                        username: data.username || currentUser.displayName,
                        email: currentUser.email,
                        photoURL: data.photoURL || currentUser.photoURL,
                        contactNumber: data.contactNumber || '',
                        insuranceDetails: data.insuranceDetails || ''
                    });
                } else {
                    // Set formData from currentUser if the Firestore document is missing
                    setFormData({
                        username: currentUser.displayName || '',
                        email: currentUser.email,
                        photoURL: currentUser.photoURL || '',
                        contactNumber: '',
                        insuranceDetails: ''
                    });
                }
            };
            loadProfile();
        }
    }, [currentUser, navigate]); // Added navigate to dependency array

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
            toast.error("Failed to upload profile picture.");
            throw new Error('Failed to upload profile picture');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        let photoURL = formData.photoURL; // Keep this outside to use in all blocks
    
        // Handle file upload separately
        if (file) {
            try {
                console.log('Uploading file...');
                photoURL = await uploadProfilePicture();  // Assume this might throw an error which will be caught
                setFormData(prevState => ({ ...prevState, photoURL }));  // Update state with the new photo URL
                console.log('File uploaded successfully:', photoURL);
            } catch (error) {
                console.error('Failed to upload file:', error);
                toast.error("Failed to upload profile picture: " + error.message);
                setLoading(false);
                return;  // Stop further execution if file upload fails
            }
        }
    
        // Update Firebase Auth profile
        try {
            console.log('Updating Firebase Auth profile...');
            await updateProfile(currentUser, { displayName: formData.username, photoURL });
            console.log('Firebase Auth profile updated successfully');
        } catch (error) {
            console.error('Failed to update Firebase Auth profile:', error);
            toast.error("Failed to update Firebase Auth profile: " + error.message);
            setLoading(false);
            return;  // Stop further execution if auth update fails
        }
    
        // Update Firestore document
        try {
            console.log('Updating Firestore document...');
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                username: formData.username,
                email: formData.email,  // This field update might be redundant if your auth system manages emails
                contactNumber: formData.contactNumber,
                insuranceDetails: formData.insuranceDetails,
                photoURL  // Ensure photoURL is updated or set initially
            });
            console.log('Firestore document updated successfully');
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error('Failed to update Firestore document:', error);
            toast.error("Failed to update Firestore document: " + error.message);
        } finally {
            setLoading(false);
        }
    
        // Optionally navigate to another route on success
        navigate("/profile"); // Adjust according to your routing needs
    }
    
    return (
        <div className="container mt-5">
            <h1 className="mb-3">Update Profile</h1>
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
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input type="text" className="form-control" id="contactNumber" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="insuranceDetails" className="form-label">Insurance Details</label>
                    <textarea className="form-control" id="insuranceDetails" value={formData.insuranceDetails} onChange={e => setFormData({ ...formData, insuranceDetails: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
}
