import React, { useState, useEffect } from 'react';
import {getWishlistByUserID, deleteWishlist} from '../services/wishlistService';
import '../styles/wishlist.css';
import '../styles/button.css';
import {auth} from "../firebase";
import { getRecipeById } from "../services/recipeService";
import { useNavigate } from 'react-router-dom';





const Wishlist = () => {
  const userID = auth.currentUser.uid
  const [UserWishlist, setUserWishlist] = useState([]);
  const [recipes, setRecipes] = useState(null);

  const navigate = useNavigate();

  const viewRecipeDetails = (id) => {
      navigate(`/recipeDetails/${id}`);
  }

  useEffect(() => {
        fetchUserWishlist(userID);
        getRecipeDetails(UserWishlist.recipeID);
      }, [userID]);


  const fetchUserWishlist = async (userID) => {
    try {
      const wishlists = await getWishlistByUserID(userID);
      setUserWishlist(wishlists); //UserWishlist is not updated at this point yet

      const recipeDetails = {};
      for (let wishlist of wishlists) {
        const recipeID = wishlist.RecipeID;
        recipeDetails[recipeID] = await getRecipeDetails(wishlist.RecipeID);
      }
      setRecipes(recipeDetails);
    } catch (error) {
      console.error('Failed to fetch wishlists:', error);
    }
  };

  //UserWishlist is set here

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
  <div>
    <div>
      <h2 className='title'>What do you want to cook today?</h2>

      <div className="spinWheel">
        <div className="spinWheel_btn"> Spin </div>
        <div className="wheel">
          {UserWishlist.map((wishlist) => (
            <div key={wishlist.id} className="slice">
              <span>{recipes[wishlist.RecipeID].recipeName}</span>
            </div>
          ))}
      </div>
    </div>
    </div>

    
    <div className='title'> <h2>Wishlists</h2> </div> 
      
      {UserWishlist.map((wishlist) => (
        <div className='card' key={wishlist.id}>
          {/* {wishlist.UserID} - {wishlist.RecipeID} */}
          {/* {JSON.stringify(wishlist)} */}

          <button className='button' onClick={() => handleDelete(wishlist.WishlistID)}> X </button>
          {recipes[wishlist.RecipeID] && (
            <div onClick={() => viewRecipeDetails(wishlist.RecipeID)}>
              
              <div className='column left'>
              {<img className='image' src={recipes[wishlist.RecipeID].image}/>}
              </div>

              <div className='column right'>
              <h3 className='recipe-name'>{recipes[wishlist.RecipeID].recipeName} </h3>
              <p className='recipe-description'>Calories: {recipes[wishlist.RecipeID].calories}</p>
              <p className='recipe-description'>Cusine: {recipes[wishlist.RecipeID].cuisine}</p>
              </div> {/* for recipe details */}
              
            </div> // for on click
          )}
          </div> // for card
  
      ))}
  </div>
  )
}


export default Wishlist
