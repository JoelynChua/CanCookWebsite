import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import {
  addWishlist,
  deleteWishlist,
  getWishlistByUserID,
} from "../services/wishlistService";
// import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import "../styles/heart.css";
import "../styles/responsive.css";

import { useAuth } from "../contexts/AuthContext";
import ReviewsDisplay from "../components/reviewsDisplay";

export default function RecipeDetails() {
  //const [recipe, setrecipe] = useState([]);
  const { currentUser } = useAuth(); // Get the current user from the AuthContext
  //const [showReviews, setShowReviews] = useState(false);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const userID = auth.currentUser.uid;

  useEffect(() => {
    if (id) {
      getRecipeDetails(id);
    }

    const checkFavoriteStatus = async () => {
      const wishlistID = await getWishlistID(userID, id);
      if (wishlistID.length === 0) {
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
      }
    };

    checkFavoriteStatus();
  }, [id]);

  const getWishlistID = async (userID, id) => {
    try {
      const wishlist = await getWishlistByUserID(userID);
      if (wishlist !== "error") {
        for (let indiv_wishlist of wishlist) {
          if (indiv_wishlist.RecipeID === id) {
            return indiv_wishlist.WishlistID;
          }
        }
      }
      return [];
    } catch (error) {
      console.error(
        `Error fetching wishlist ID for userID ${userID} and recipeID ${id}:`,
        error.message
      );
    }
  };

  const getRecipeDetails = async (id) => {
    try {
      const response = await getRecipeById(id);
      console.log(response);
      setRecipe(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleCreate = async (userID, recipeID) => {
    try {
      const newWishlist = await addWishlist(userID, recipeID);
      console.log(newWishlist);
    } catch (error) {
      console.error(
        `Error creating wishlist for userID ${userID} and recipeID ${recipeID}:`
      );
      console.error("failed", error);
    }
  };

  const handleDelete = async (WishlistID) => {
    try {
      const response = await deleteWishlist(WishlistID);
      console.log("delete successful");
    } catch (error) {
      console.error("failed delete", error);
    }
  };

  const toggleFavorite = async (userID, id) => {
    // check if recipe has its wishlistID
    const wishlistID = await getWishlistID(userID, id);
    if (wishlistID.length === 0) {
      handleCreate(userID, id);
      setIsFavorite(true);
      sessionStorage.setItem(`favorite-${id}`, "true");
    } else {
      handleDelete(wishlistID);
      setIsFavorite(false);
      sessionStorage.setItem(`favorite-${id}`, "false");
    }
  };

  return (
    <div className=" bg-beige_main ">
      <div className="self-center">
        <div
          id={recipe._id}
          style={{ paddingLeft: 10 + "%", paddingRight: 10 + "%" }}
        >
          {/* Render = how React components output UI elements */}
          {/* Render (return statement of the function component) your recipe details here, e.g., recipe name, cuisine, etc. */}
          <p className="font-bold text-2xl" style={{ textAlign: "center" }}>
            {recipe.recipeName}
          </p>
          <br></br>
          <div
            style={{
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              className="size-56 rounded-lg"
              src={recipe.image}
              style={{ float: "left" }}
            />
            <p
              className={`heart ${isFavorite ? "red" : ""}`}
              onClick={() => toggleFavorite(userID, id)}
              style={{
                float: "right",
                position: "absolute",
                marginTop: 175 + "px",
                marginLeft: 165 + "px",
              }}
            />
          </div>
          <p>Cuisine: {recipe.cuisine}</p>
          <p>Duration: {recipe.duration}</p>
          <p>Serving Size: {recipe.servingSize}</p>
          <p>Calories: {recipe.calories}</p>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          <p>Equipments: {recipe.equipments.join(", ")}</p>
          <br></br>
          {/* Steps to be printed in new line after every , */}
          <p>Steps:</p>
          {recipe.steps.map((step, stepIndex) => (
            <p key={stepIndex}>{step}</p>
          ))}
        </div>
      </div>
      <div>
        <ReviewsDisplay
          recipeID={id}
          userID={currentUser ? currentUser.uid : null}
        />
      </div>
    </div>
  );
}
