import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllWishlists = async () => {
    const response = await axios.get(`${API_URL}/wishlists`);
    return response.data;
  };

export const addWishlist = async (userID, recipeID) => {
  const newWishlist = { UserID: userID, RecipeID: recipeID };
  const response = await axios.post(`${API_URL}/wishlist`, newWishlist);
  return response.data;
};
