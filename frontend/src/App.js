import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./screens/HomePage";
import Wishlist from "./screens/Wishlist";
import NaviBar from "./components/naviBar";
import Signup from "./screens/Signup"
import SignIn from "./screens/Signin";


const AppContent = () => {
  const location = useLocation();
  const noNavBarPaths = ['/signup','/signin']; // Add routes that should not display the NaviBar here

  return (
    <div>
      {!noNavBarPaths.includes(location.pathname) && <NaviBar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Wishlist' element={<Wishlist />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/SignIn' element={<SignIn />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
