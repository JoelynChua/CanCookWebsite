import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./screens/HomePage";
import Wishlist from "./screens/Wishlist";
import NaviBar from "./components/naviBar";
import RecipeDetails from "./screens/recipeDetails";




function App() {
  return (
    <div >
      <NaviBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          <Route path='/recipeDetails/:id' element={<RecipeDetails />} />
          <Route path='/recipeDetails/:id' element={<RecipeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
