import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from "../services/recipeService";
import { useAuth } from '../contexts/AuthContext';
import ReviewsDisplay from '../components/reviewsDisplay'; 


export default function RecipeDetails() {
    //const [recipe, setrecipe] = useState([]);
    const { currentUser } = useAuth(); // Get the current user from the AuthContext
    //const [showReviews, setShowReviews] = useState(false);
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        if (id) {
            getRecipeDetails(id);
        }
    }, [id]);


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


    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div id={recipe._id}>
                    {/* Render = how React components output UI elements */}
                    {/* Render (return statement of the function component) your recipe details here, e.g., recipe name, cuisine, etc. */}
                    <p className="font-bold text-2xl">{recipe.recipeName}</p>
                    <br></br>
                    <img className="size-56 rounded-lg" src={recipe.image} />
                    <p>Cuisine: {recipe.cuisine}</p>
                    <p>Duration: {recipe.duration}</p>
                    <p>Serving Size: {recipe.servingSize}</p>
                    <p>Calories: {recipe.calories}</p>
                    <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                    <p>Equipments: {recipe.equipments.join(', ')}</p>
                    <br></br>
                    {/* Steps to be printed in new line after every , */}
                    <p>Steps:</p>
                    {recipe.steps.map((step, stepIndex) => (
                        <p key={stepIndex}>{step}</p>
                    ))}

                </div>
            </div>
            <div>
            <ReviewsDisplay recipeID={id} userID={currentUser ? currentUser.uid : null} />
            </div>

        </div>
        
        
       

        
        


    )
}
