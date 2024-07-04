import React, { useState, useEffect } from 'react';
import FilterCard from "../components/filteredCard";
import { getRecipesByCuisine, getRecipesByIngredients, getRecipesByCalories, getRecipesByCaloriesIngredients } from "../services/recipeService";
import { useParams } from 'react-router-dom';

export default function FilteredResults() {
    const [recipeList, setRecipeList] = useState([]);
    const { cuisine } = useParams();
    const ingredients = sessionStorage.getItem('selectedIngredients');
    const minCalories = sessionStorage.getItem('selectedMinCalories');
    const maxCalories = sessionStorage.getItem('selectedMaxCalories');
    console.log(ingredients, minCalories, maxCalories)

    useEffect(() => {
        if (cuisine) {
            console.log(cuisine);
            getRecipesByCuisine(cuisine)
                .then(response => {
                    console.log("Fetched recipes by cuisine:", response);
                    setRecipeList(response);
                })
                .catch(error => console.error("Error fetching recipes by cuisine:", error));
        } 
        
        else if (ingredients.length > 0 && minCalories !== null && maxCalories !== null) {
            console.log("Fetching recipes by ingredients and calories:", ingredients, minCalories, maxCalories);
    
            getRecipesByCaloriesIngredients(ingredients, minCalories, maxCalories)
                .then(response => {
                    console.log("Fetched recipes by ingredients and calories:", response);
                    setRecipeList(response);
                })
                .catch(error => console.error("Error fetching recipes by ingredients and calories:", error));
        } 
        
        else if (ingredients && (minCalories === null || maxCalories === null)) {
            console.log("Fetching recipes by ingredients:", ingredients);
    
            getRecipesByIngredients(ingredients)
                .then(response => {
                    console.log("Fetched recipes by ingredients:", response);
                    setRecipeList(response);
                })
                .catch(error => console.error("Error fetching recipes by ingredients:", error));
        } 
        
        else if (ingredients.length === 0 && minCalories && maxCalories) {
            console.log("Fetching recipes by calories:", minCalories, maxCalories);
    
            getRecipesByCalories(minCalories, maxCalories)
                .then(response => {
                    console.log("Fetched recipes by calories:", response);
                    setRecipeList(response);
                })
                .catch(error => console.error("Error fetching recipes by calories:", error));
        } 
        
        else {
            console.error("No selected ingredients or calorie range found in sessionStorage.");
        }
    }, [cuisine, ingredients, minCalories, maxCalories]);


    // const getRecipes = () => {
    //     getRecipesByCuisine(cuisine) // Fetch recipes by cuisine
    //         .then(response => {
    //             console.log("Fetched recipes:", response); //Array
    //             setRecipeList(response);
    //         })
    //         .catch(error => console.error("Error fetching recipes:", error));
    // };
    console.log(recipeList);

    // Using frontend to filter
    // const getRecipes = () => {
    //     getAllRecipes()
    //         .then(response => {
    //             const filteredRecipes = response.filter(recipe => recipe.cuisine === cuisine);
    //             setRecipeList(filteredRecipes);
    //             console.log(filteredRecipes);
    //         })
    //         .catch(error => console.error("Error fetching recipes:", error));
    // };


    return (
        <div className="flex flex-wrap justify-center">
            {recipeList.length > 0 ? (
                recipeList.map((recipe) => (
                    <div key={recipe.id}>
                        <FilterCard
                            recipe={recipe}
                        />
                    </div>
                ))
            ) : (
                <p>No recipes found for {cuisine}</p>
            )}
        </div>

        //     <div className="flex flex-wrap justify-center">
        //         <p>Test</p>

        //         {recipeList.map((recipe) => (
        //         <div key={recipe.id}>
        //             <FilterCard
        //                 id={recipe.id}
        //                 recipeName={recipe.recipeName}
        //                 recipeImage={recipe.image}
        //                 cuisine={recipe.cuisine}
        //             />
        //             </div>
        //         ))}
        //     </div>
    );
}
