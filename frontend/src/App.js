import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./screens/HomePage";
import Wishlist from "./screens/Wishlist";
import NaviBar from "./components/naviBar";
import RecipeDetails from "./screens/recipeDetails";
import FilteredResults from "./screens/filteredResults";

import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";


    return (
        <div>
            {!noNavBarPaths.includes(location.pathname) && <NaviBar />}
            <Routes>
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/Wishlist" element={<Wishlist />} />
                <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
                <Route
                    path="/filteredResults/cuisine/:cuisine"
                    element={<FilteredResults />}
                />
                <Route
                    path="/filteredResults/ingredients"
                    element={<FilteredResults />}
                />
                <Route
                    path="/filteredResults/calories"
                    element={<FilteredResults />}
                />
                <Route
                    path="/filteredResults/caloriesIngredients"
                    element={<FilteredResults />}
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            {" "}
                            <HomePage />{" "}
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/Wishlist"
                    element={
                        <PrivateRoute>
                            {" "}
                            <Wishlist />{" "}
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
};

function App() {
  return (
    <div >
      <NaviBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/recipeDetails/:id' element={<RecipeDetails />} />
          <Route path='/filteredResults/cuisine/:cuisine' element={<FilteredResults />} />
          <Route path='/filteredResults/ingredients' element={<FilteredResults />} />
          <Route path='/filteredResults/calories' element={<FilteredResults />} />
          <Route path='/filteredResults/caloriesIngredients' element={<FilteredResults />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
