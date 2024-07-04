
import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import Carousel from "../components/carousel";
import SearchBar from "../components/searchbar";
import { useAuth } from "../contexts/AuthContext";
import Filter from '../components/filter';

export default function HomePage() {

    const { currentUser } = useAuth();
    const [recipeList, setRecipeList] = useState([]);


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

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-beige_main">
            <div className="text-center text-2xl mb-4">
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
                    <h2 className="text-xl mb-2">Your Wishlist</h2>
                    {/* Render the wishlist or other user-specific content here */}
                    {/* Example wishlist rendering: */}
                    <ul>
                        {/* Assuming you have a wishlist array in the user object */}
                        {currentUser.wishlist &&
                        currentUser.wishlist.length > 0 ? (
                            currentUser.wishlist.map((item, index) => (
                                <li key={index}>{item}</li>
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
