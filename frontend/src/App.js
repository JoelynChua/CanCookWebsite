import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./screens/HomePage";
import Wishlist from "./screens/Wishlist";
import NaviBar from "./components/naviBar";
import Signup from "./screens/Signup"
import Signin from "./screens/Signin";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext"; 


const AppContent = () => {
  const location = useLocation();
  const noNavBarPaths = ['/Signup','/Signin', '/signin', '/signup','/ForgotPassword', '/ResetPassword']; // Add routes that should not display the NaviBar here

  return (
    <div>
      {!noNavBarPaths.includes(location.pathname) && <NaviBar />}
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        <Route path="/" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
        <Route path="/Wishlist" element={<PrivateRoute> <Wishlist /> </PrivateRoute>} />

      </Routes>
    </div>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
