import React, { useState, useEffect } from 'react';
import {getAllWishlists, getWishlistByUserID, deleteWishlist, addWishlist} from '../services/wishlistService';
import { useAuth } from "../contexts/AuthContext";
import '../styles/wishlist.css';
import '../styles/button.css';
import {auth} from "../firebase";
import { getRecipeById } from "../services/recipeService";


const Wishlist = () => {
  //const userID = sessionStorage.getItem('userID');
  const currentUser = useAuth();
  const userID = auth.currentUser.uid
  const [wishlists, setWishlists] = useState([]);
  const [UserWishlist, setUserWishlist] = useState([]);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
        fetchWishlists();
        fetchUserWishlist(userID);
        getRecipeDetails(wishlists.recipeID);
      }, [userID]);

  const fetchWishlists = async () => {
    try {
      const wishlists = await getAllWishlists();
      setWishlists(wishlists);
    } catch (error) {
      console.error('Failed to fetch wishlists:', error);
    }
  };

  const fetchUserWishlist = async (userID) => {
    try {
      const wishlists = await getWishlistByUserID(userID);
      setUserWishlist([wishlists]);
      // wishlists.filter(wishlist => wishlist.userID === userID);

      const recipeDetails = {};
      for (let wishlist of wishlists) {
        const recipeID = wishlist.recipeID;
        recipeDetails[recipeID] = await getRecipeDetails(recipeID);
      }
      setRecipes(recipeDetails);
    } catch (error) {
      console.error('Failed to fetch wishlists:', error);
    }
  };

  const getRecipeDetails = async (RecipeID) => {
    try {
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
    try{
      const response = await deleteWishlist(wishlistID);
    } catch (error) {
      console.error('Failed to delete wishlist:', error);
    }
  }


  return (
    <div className='container'>
      {/* Start of Display */}
      <h2>Wishlists</h2>    
      {wishlists.map((wishlist) => (
        <div className='card' key={wishlist.id}>
          {wishlist.UserID} - {wishlist.RecipeID}
          {recipes[wishlist.RecipeID] && (
            <div>
              {recipes[wishlist.RecipeID].recipeName}
              {recipes[wishlist.RecipeID].image}
            </div>
          )}
          <button className='button' onClick={handleDelete(wishlist.id)}> X </button>
        </div>
      ))}
    </div>
  )
}

// const handleCreate = async (newWish) => {
//   newWish.preventDefault();
//   try {
//     const newWishlist = await addWishlist(userID, recipeID);
//     setWishlists([...wishlists, newWishlist]);
//   } catch (error) {
//     console.error('Failed to create wishlist:', error);
//   }
// };
export default Wishlist
