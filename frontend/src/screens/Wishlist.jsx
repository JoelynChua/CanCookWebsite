import React, { useState, useEffect } from 'react';
import {getWishlistByUserID, deleteWishlist} from '../services/wishlistService';
import '../styles/wishlist.css';
import '../styles/button.css';
import {auth} from "../firebase";
import { getRecipeById } from "../services/recipeService";


const Wishlist = () => {
  const userID = auth.currentUser.uid
  const [UserWishlist, setUserWishlist] = useState([]);
  const [recipes, setRecipes] = useState(null);


  useEffect(() => {
        fetchUserWishlist(userID);
        getRecipeDetails(UserWishlist.recipeID);
      }, [userID]);


  const fetchUserWishlist = async (userID) => {
    try {
      console.log(userID)
      const wishlists = await getWishlistByUserID(userID);
      setUserWishlist([wishlists]);
      console.log(wishlists)

      const recipeDetails = {};
      for (let wishlist of UserWishlist) {
        console.log(wishlist)
        const recipeID = wishlist.recipeID;
        recipeDetails[recipeID] = await getRecipeDetails(wishlist.RecipeID);
      }
      setRecipes(recipeDetails);
    } catch (error) {
      console.error('Failed to fetch wishlists:', error);
    }
  };

  const getRecipeDetails = async (RecipeID) => {
    try {
      console.log(RecipeID)
      const response = await getRecipeById(RecipeID);
      return response;
    } catch (error) {
        console.log(error.message); 
    }
  };
  if (!recipes) {
      return <div>Loading...</div>;
  }

  const handleDelete = async (wishlistID) => {
    try {
      await deleteWishlist(wishlistID);
      // Refetch wishlist after deletion
      const updatedWishlists = await getWishlistByUserID(userID);
      setUserWishlist(updatedWishlists);

      const recipeDetails = {};
      for (let wishlist of updatedWishlists) {
        const recipeID = wishlist.RecipeID;
        recipeDetails[recipeID] = await getRecipeDetails(recipeID);
      }
      setRecipes(recipeDetails);
    } catch (error) {
      console.error('Failed to delete wishlist:', error);
    }
  };


  return (
    
    <div className='container'>

      {/* Start of Display */}
      <h2>Wishlists</h2>    
      {UserWishlist.map((wishlist) => (
        <div className='card' key={wishlist.id}>
          {wishlist.UserID} - {wishlist.RecipeID}
          {recipes[wishlist.RecipeID] && (
            <div>
              {recipes[wishlist.RecipeID].recipeName}
              {recipes[wishlist.RecipeID].image}
            </div>
          )}
          <button className='button' onClick={() => handleDelete(wishlist.id)}> X </button>
        </div>
      ))}
    </div>
  )
}


export default Wishlist
