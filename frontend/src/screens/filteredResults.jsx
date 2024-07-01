import React, { useState, useEffect } from 'react';
import FilterCard from "../components/filteredCard";
import { getRecipesByCuisine, getRecipesByIngredients } from "../services/recipeService";
import { useParams } from 'react-router-dom';

export default function FilteredResults() {
    const [recipeList, setRecipeList] = useState([]);
    const { cuisine } = useParams();
    const ingredients = sessionStorage.getItem('selectedIngredients')

    useEffect(() => {
        if (cuisine) {
            console.log(cuisine);
            getRecipesByCuisine(cuisine) // Fetch recipes by cuisine
                .then(response => {
                    console.log("Fetched recipes by cuisine:", response);
                    setRecipeList(response);
                })
                .catch(error => console.error("Error fetching recipes by cuisine:", error));
        }

        else if (ingredients) {
            console.log("Fetching recipes by ingredients:", ingredients);
            getRecipesByIngredients(ingredients)
                .then(response => {
                    console.log("Fetched recipes by ingredients:", response);
                    setRecipeList(response);
                })
                .catch(error => console.error("Error fetching recipes by ingredients:", error));
        }
        else {
            console.error("No selected ingredients found in sessionStorage.");
        }


    }, [cuisine, ingredients]); // Add cuisine and ingredients as dependencies to refetch recipes when they change

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
