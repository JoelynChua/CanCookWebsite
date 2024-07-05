// Source: https://www.youtube.com/watch?v=OaeVtQsEcUE
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';


const SearchBar = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // This search will slowly filter based on what is type
    const fetchRecipes = async (searchQuery) => {
        try {
            setLoading(true);
            const response = await fetch('https://cancook-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json');
            const responseData = await response.json();

            // Map is commonly used to iterate over arrays of data to render components dynamically -- used when needed to call objects in an array
            // ... allows passing of props/data dynamically -- pass multiples data
            const filteredResults = Object.keys(responseData).map(key => ({
                id: key,
                ...responseData[key],
            })).filter(recipe =>
                recipe.recipeName.toLowerCase().includes(searchQuery)
            );
            setResult(filteredResults);

        } catch (err) {
            setError('Failed to fetch recipes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchRecipes = useCallback(debounce((searchQuery) => {
        if (searchQuery.length > 0) {
            fetchRecipes(searchQuery);
            // console.log(searchQuery, "query")
        } else {
            setResult([]);
        }
    }, 500), []);

    useEffect(() => {
        debouncedFetchRecipes(value.toLowerCase());
    }, [value, debouncedFetchRecipes]);



    // Declare that the function takes in a id parameter
    const viewRecipeDetails = (id) => {
        navigate(`/recipeDetails/${id}`);
    };


    return (
        <div className="w-full flex flex-col items-center">
            <p className='titleText'>Search</p>
            <input
                type='text'
                className='border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md'
                placeholder='Search recipes...'
                onChange={(event) => setValue(event.target.value)}
                value={value}
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='searchBack mt-4 w-full max-w-md'>
                {result.map((recipe, index) => (
                    // key={index} helps to identify each item
                    <div key={index} className='block mb-2'>
                        <div className='bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer select-none' 
                            onClick={() => viewRecipeDetails(recipe.id)} >
                            {recipe.recipeName}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
