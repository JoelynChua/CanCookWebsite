import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchRecipes = async (searchQuery) => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://cancook-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
            );
            const responseData = await response.json();

            const filteredResults = Object.keys(responseData)
                .map((key) => ({
                    id: key,
                    ...responseData[key],
                }))
                .filter((recipe) =>
                    recipe.recipeName.toLowerCase().includes(searchQuery)
                );
            setResult(filteredResults);
        } catch (err) {
            setError("Failed to fetch recipes");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchRecipes = useCallback(
        debounce((searchQuery) => {
            if (searchQuery.length > 0) {
                fetchRecipes(searchQuery);
            } else {
                setResult([]);
            }
        }, 500),
        []
    );

    useEffect(() => {
        debouncedFetchRecipes(value.toLowerCase());
    }, [value, debouncedFetchRecipes]);

    const viewRecipeDetails = (id) => {
        navigate(`/recipeDetails/${id}`);
    };

    return (
        <div className="w-full flex flex-col items-center mt-3 mb-2">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md bg-pink-100 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-pink-200">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="text-gray-500 mr-2"
                />
                <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none"
                    placeholder="Search recipes..."
                    onChange={(event) => setValue(event.target.value)}
                    value={value}
                />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="mt-4 w-full max-w-md">
                {result.map((recipe, index) => (
                    <div key={index} className="block mb-2">
                        <div
                            className="bg-pink_main rounded-full px-4 py-2 cursor-pointer hover:bg-pink-200"
                            onClick={() => viewRecipeDetails(recipe.id)}
                        >
                            {recipe.recipeName}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
