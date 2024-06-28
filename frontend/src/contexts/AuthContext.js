import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        // return auth.createUserWithEmailAndPassword(email, password)
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
                console.log("Signed up user:", user);
                return true;
            })
            .catch((error) => {
                console.log("Error signing up:", error);
                return false;
            });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Signed in user:", user);

                return true;
            })
            .catch((error) => {
                console.log("Error signing in:", error);
                return false;
            });
    }

    function forgotpassword(email) {
        return sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("A password Reset Link has been sent to your email");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
            });
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        forgotpassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
//if we are not loading then we render out the children
