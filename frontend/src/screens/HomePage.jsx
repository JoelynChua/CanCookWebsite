import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Carousel from "../components/carousel";
import SearchBar from '../components/searchbar';
import Filter from '../components/filter';
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

<<<<<<< HEAD
    return (
        <div className="flex flex-col justify-center items-center w-screen min-h-full bg-beige_main p-0 mt-0">
            {/* filters */}
            <div className="mt-10 h-screen">
                <Filter />
                {/* Container for the search bar */}

                <SearchBar />

                <Carousel />
            </div>
        </div>
    );
=======
  }

  // Search
  // const RecipeSearchApp = () => {
  //   const [recipe, setRecipe] = useState(null);

  //   const handleSearch = (data) => {
  //     setRecipe(data);
  //   };



  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      {/* filters */}
      <Filter />
      {/* Container for the search bar */}
      <div className="w-full flex justify-center">
        <SearchBar />
      </div>
      {/* Container for the carousel */}
      {/* <div className="w-full flex justify-center mt-4">
        <Carousel />
      </div> */}
    </div>

  )

>>>>>>> parent of bd481be (logos and navi bar updates)
}
