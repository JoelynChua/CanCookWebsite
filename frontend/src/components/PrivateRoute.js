//A component that protects routes and redirects unauthenticated users to the login page

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
