// Source: https://github.com/Ajay-Maury/spin-wheel-game

import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getWishlistByUserID } from "../services/wishlistService";
import { getRecipeById } from "../services/recipeService";

export default function SpinTheWheel() {
  //const [wishlistRecipes, setWishlistRecipes] = useState([]);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const fetchWishlistAndRecipes = async () => {
      try {
        const userID = auth.currentUser.uid;
        console.log(userID);
        const wishlist = await getWishlistByUserID(userID);
        console.log("Fetched recipes by userID:", wishlist);

        // Fetch detailed recipe info
        const detailedRecipesPromises = wishlist.map(
          async (wishlistItem, index) => {
            const recipeDetails = await getRecipeById(wishlistItem.RecipeID);
            return {
              segmentText: recipeDetails.recipeName,
              segColor: [
                "#f49097",
                "#dfb2f4 ",
                "#f5e960 ",
                "#f2f5ff ",
                "#55d6c2",
              ][index % 5], // Cycle through colors
            };
          }
        );

        // Wait for all recipe details to be fetched
        const detailedRecipes = await Promise.all(detailedRecipesPromises);

        setSegments(detailedRecipes);
        console.log("Segments:", detailedRecipes);
      } catch (error) {
        console.error(
          "Error fetching recipes by userID or recipe details:",
          error
        );
      }
    };

    fetchWishlistAndRecipes();
  }, []); // Dependency array is empty to ensure this effect runs only once on mount

  // useEffect(() => {
  //     const userID = auth.currentUser.uid;
  //     console.log(userID);
  //     getWishlistByUserID(userID)
  //         .then((response) => {
  //             console.log("Fetched recipes by userID:", response);
  //             setWishlistRecipes(response);
  //             console.log(25, response);
  //         })
  //         .catch((error) =>
  //             console.error("Error fetching recipes by userID:", error)
  //         );
  // }, [wishlistRecipes]); // Closing the useEffect with a dependency array

  // const segments = wishlistRecipes.map((wishlist, index) => ({
  //     segmentText:  wishlist.RecipeID,
  //     segColor: ['red', 'blue', 'green', 'yellow', 'purple'][index % 5], // Cycle through colors
  // }));
  // console.log("Segments:", segments);

  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
    // Handle the result as needed
  };

  const spinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 290,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: true,
  };

  // important to have key={segments.length}, otherwise would not register into the segmentText properly to be displayed
  return <SpinWheel key={segments.length} {...spinWheelProps} />;
}
