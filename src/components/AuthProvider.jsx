import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log(user);
        });
    }, []);

    

    return (
        <AuthContext.Provider value = {{ currentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}