import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
//import { db } from '../../../backend/config/firebase';

// import { ref, onValue } from "firebase/database";
// import { database } from '../../backend/config/firebase';

import { getAllRecipes } from "../services/recipeService";

export default function HomePage() {

  {/* Working on the display of recipe details */ }
  // Source: https://www.youtube.com/watch?v=F7t-n5c7JsE&list=PLzKiusGbAW3gDkFz9nlohhxEaWhMxnGHX&index=8
  const [recipeList, setrecipeList] = useState([]);

  useEffect(() => {
    getRecipes()
  }, [])

  // Helper function
  function getRecipes() {
    getAllRecipes()
      .then((response) => {
        console.log(response)
        // set the list of receipes
        setrecipeList(response)

      }).catch(error => console.log(error.message))

  }


  return (
    <div className='flex justify-center items-center w-full h-screen'>

      {/* Actual list of recipes */}
      <div>
        {recipeList.map((recipe, index) => {
          return (
            <div
              key={index}
              id={recipe._id}
            >
              {/* Render your recipe details here, e.g., recipe name, cuisine, etc. */}
              <p class="font-bold text-2xl">{recipe.recipeName}</p>
              <br></br>
              <img class="size-56 rounded-lg" src = {recipe.image} />
              <p>Cuisine: {recipe.cuisine}</p>
              <p>Duration: {recipe.duration}</p>
              <p>Serving Size: {recipe.servingSize}</p>
              <p>Calories: {recipe.calories}</p>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <p>Equipments: {recipe.equipments.join(', ')}</p>
              {/* Steps to be printed in new line after every , */}
              <p>Steps:</p>
              {recipe.steps.map((step, stepIndex) => (
                <p key={stepIndex}>{step}</p>
              ))}
            </div>
          );
        })}
      </div>



    </div>
  )

}
