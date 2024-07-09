import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from "../services/recipeService";
import {addWishlist} from '../services/wishlistService';
import { useAuth } from "../contexts/AuthContext";
import {auth} from "../firebase";
import '../styles/heart.css';


export default function RecipeDetails() {
    //const [recipe, setrecipe] = useState([]);
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const userID = 1;

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

    const handleCreate = async (userID, recipeID) => {
        try {
            const newWishlist = await addWishlist(userID, recipeID);
        } catch (error) {
            console.error('failed', error);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            handleCreate(userID, recipe.recipeID);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div id={recipe._id}>
                {/* Render = how React components output UI elements */}
                {/* Render (return statement of the function component) your recipe details here, e.g., recipe name, cuisine, etc. */}
                <p className="font-bold text-2xl">{recipe.recipeName}</p>
                <br></br>
                <img className="size-56 rounded-lg" src={recipe.image} /> 
                <div 
                    className={`heart ${isFavorite ? 'red' : ''}`}
                    onClick={toggleFavorite}
                />
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


    )
}
