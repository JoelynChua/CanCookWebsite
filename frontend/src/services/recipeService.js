//create functions to make use of axiosInstance to send data into backend

import axiosInstance from "../utils/axiosInstance";
const cloudURL = "https://can-cook-website-bw1l-qsf88me6g-joelynchuas-projects.vercel.app/";
const localURL =  "http://localhost:5000/";
const finalURL = cloudURL 

async function getAllRecipes() {
    //Send a request to the backend
    const res = await axiosInstance({
        method: "get",
        url: `${finalURL}api/recipes`
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
        url: `${finalURL}/api/filteredResults/cuisine/${cuisine}`
       
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
        // Get the data by response body
        data: { ingredients: ingredients }
    });

    //Return the list of to-do tasks
    console.log(res.data)
    return res.data;
}

async function getRecipesByCalories(minCalories, maxCalories) {
    //Send a request to the backend
    console.log(minCalories, maxCalories);
    const data = {
        minCalories: minCalories,
        maxCalories: maxCalories
    };
    
    const res = await axiosInstance({
        method: "post",
        url: `http://localhost:5000/api/filteredResults/calories`,
        // Get the data by response body
        data: data
    });

    //Return the list of to-do tasks
    console.log(res.data)
    return res.data;
}


async function getRecipesByCaloriesIngredients(ingredients, minCalories, maxCalories) {
    // Ensure ingredients is an array and not a string
    if (typeof ingredients === 'string') {
        ingredients = JSON.parse(ingredients);
    }

    // Construct the data object correctly
    const data = {
        ingredients: ingredients,
        minCalories: minCalories,
        maxCalories: maxCalories
    };

    try {
        const res = await axiosInstance({
            method: "post",
            url: `http://localhost:5000/api/filteredResults/caloriesIngredients`,
            data: data
        });

        // Return the list of recipes
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

export{
    getAllRecipes,
    getRecipeById,
    getRecipesByCuisine,
    getRecipesByIngredients,
    getRecipesByCalories,
    getRecipesByCaloriesIngredients
}
