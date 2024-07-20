// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import Carousel from "../components/carousel";
// import SearchBar from "../components/searchbar";
// import Filter from "../components/filter";
//import { db } from '../../../backend/config/firebase';
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import Carousel from "../components/carousel";
// import SearchBar from '../components/searchbar';
// import Filter from '../components/filter';
// //import { db } from '../../../backend/config/firebase';

// // import { ref, onValue } from "firebase/database";
// // import { database } from '../../backend/config/firebase';

// import { getAllRecipes } from "../services/recipeService";

// export default function HomePage() {

//   {/* Working on the display of recipe details */ }
//   // Source: https://www.youtube.com/watch?v=F7t-n5c7JsE&list=PLzKiusGbAW3gDkFz9nlohhxEaWhMxnGHX&index=8
//   const [recipeList, setrecipeList] = useState([]);

//   useEffect(() => {
//     getRecipes()
//   }, [])

//   // Helper function
//   function getRecipes() {
//     getAllRecipes()
//       .then((response) => {
//         console.log(response)
//         // set the list of receipes
//         setrecipeList(response)

//       }).catch(error => console.log(error.message))

//   }

//   // Search
//   // const RecipeSearchApp = () => {
//   //   const [recipe, setRecipe] = useState(null);

//   //   const handleSearch = (data) => {
//   //     setRecipe(data);
//   //   };

//   return (
//     <div className="flex flex-col justify-center items-center w-full h-screen">
//       {/* filters */}
//       <Filter />
//       {/* Container for the search bar */}
//       <div className="w-full flex justify-center">
//         <SearchBar />
//       </div>
//       {/* Container for the carousel */}
//       {/* <div className="w-full flex justify-center mt-4">
//         <Carousel />
//       </div> */}
//     </div>

//   )

// }

import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import { getWishlistByUserID } from "../services/wishlistService";
import Carousel from "../components/carousel";
import SearchBar from "../components/searchbar";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
    const { currentUser } = useAuth();
    const [recipeList, setRecipeList] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async () => {
        try {
            const response = await getAllRecipes();
            console.log(response);
            setRecipeList(response);
        } catch (error) {
            console.log(error.message);
        }
    };
 
    const getWishlists = async (userID) => {
        try {
            const response = await getWishlistByUserID(userID);
            setWishlist(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-beige_main">
            <div className="text-center text-2xl mb-4 font-baloo">
                {currentUser
                    ? `Hello, ${currentUser.email}!`
                    : "Welcome to CanCook!"}
            </div>

            {/* Container for the search bar */}
            <div className="w-full flex justify-center mb-4">
                <SearchBar />
            </div>

            {/* Container for the carousel */}
            <div className="w-full flex justify-center mb-4">
                <Carousel />
            </div>

            {/* Conditional rendering based on user login status */}
            {currentUser ? (
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-xl mb-2 font-">Your Wishlist</h2>
                    {/* Render the wishlist or other user-specific content here */}
                    {/* Example wishlist rendering: */}
                    <ul>
                        {/* Assuming you have a wishlist array in the user object */}
                        {wishlist &&
                        wishlist.length > 0 ? (
                            wishlist.map((indiv_element) => (
                                <li key={indiv_element.id}>ho</li>
                            ))
                        ) : (
                            <p>You have no items in your wishlist.</p>
                        )}
                    </ul>
                </div>
            ) : (
                <div className="text-center mt-4">
                    <p>Please log in to see your wishlist and more.</p>
                </div>
            )}
        </div>
    );
}
