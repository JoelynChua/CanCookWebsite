import React from 'react'

import React, { useState, useEffect } from 'react';
import {getAllWishlists, getWishlistByUserID, deleteWishlist, addWishlist} from '../services/wishlistService';
import { useAuth } from "../contexts/AuthContext";
import '../styles/wishlist.css';
import '../styles/button.css';
import empty_heart from '../assets/empty_heart.png';


const Wishlist = () => {
  const userID = sessionStorage.getItem('userID');
  const [wishlists, setWishlists] = useState([]);
  const [UserWishlist, setUserWishlist] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // ISSUE HERE! what am I supposed to include under useEffect?
        fetchWishlists();
        fetchUserWishlist(userID);
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
      setUserWishlist([...wishlists, UserWishlist]);
      // wishlists.filter(wishlist => wishlist.userID === userID);
    } catch (error) {
      console.error('Failed to fetch wishlists:', error);
    }
  };

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
