import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const cloudURL = "https://can-cook-website-bw1l.vercel.app";
const finalURL = cloudURL;

export const getAllWishlists = async () => {
    const response = await axios.get(`${finalURL}/api/wishlists`);
    return response.data;
  };

export const getWishlistByUserID = async (userID) => {
  const response = await axios.get(`${finalURL}/api/wishlists/user/${userID}`)
  console.log(response.data);
  return response.data;
  };


export const addWishlist = async (userID, recipeID) => {
  const newWishlist = { UserID: userID, RecipeID: recipeID };
  const response = await axios.post(`${finalURL}/api/wishlists`, newWishlist);
  return response.data;
};

export const deleteWishlist = async (wishlistID) => {
  const response = await axios.delete(`${finalURL}/api/wishlists/${wishlistID}`)
}