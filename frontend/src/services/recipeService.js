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


export{
    getAllRecipes,
    getRecipeById
}
