//create functions to make use of axiosInstance to send data into backend

import axiosInstance from "../utils/axiosInstance";

async function getAllRecipes() {
    //Send a request to the backend
    const res = await axiosInstance({
        method: "get",
        url: "http://localhost:5000/api/recipes"
    });

    //Return the list of to-do tasks
    return res.data;
}

async function getRecipeById(id) {
    //Send a request to the backend
    const res = await axiosInstance({
        method: "get",
        url: `http://localhost:5000/api/recipeDetails/${id}`
    });

    //Return the list of to-do tasks
    console.log(res.data)
    return res.data;
}

async function getRecipesByCuisine(cuisine) {
    //Send a request to the backend
    const res = await axiosInstance({
        method: "get",
        url: `http://localhost:5000/api/filteredResults/cuisine/${cuisine}`
    });

    //Return the list of to-do tasks
    console.log(res.data)
    return res.data;
}

async function getRecipesByIngredients(ingredients) {
    //Send a request to the backend
    console.log(ingredients);
     // Ensure ingredients is an array and not a string
     if (typeof ingredients === 'string') {
        ingredients = JSON.parse(ingredients);
    }
    
    const res = await axiosInstance({
        method: "post",
        url: `http://localhost:5000/api/filteredResults/ingredients`,
        data: { ingredients: ingredients }
    });

    //Return the list of to-do tasks
    console.log(res.data)
    return res.data;
}


export{
    getAllRecipes,
    getRecipeById,
    getRecipesByCuisine,
    getRecipesByIngredients
}
