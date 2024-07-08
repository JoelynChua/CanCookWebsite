import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// This file is to get filter (cuisine, ingredients) based on its available category in DB
export default function Filter() {
    const [cuisines, setCuisines] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [caloriesRange, setCaloriesRange] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupContent, setPopupContent] = useState(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedMinCalories, setSelectedMinCalories] = useState(null);
    const [selectedMaxCalories, setSelectedMaxCalories] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://cancook-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const cuisineSet = new Set();
                const ingredientSet = new Set();
                let minCalories = Infinity;
                let maxCalories = -Infinity;

                Object.keys(data).forEach((key) => {
                    const recipe = data[key];
                    if (recipe.cuisine) {
                        cuisineSet.add(recipe.cuisine);
                    }

                    if (
                        recipe.ingredients &&
                        Array.isArray(recipe.ingredients)
                    ) {
                        recipe.ingredients.forEach((ingredient) => {
                            const wordsAfterOf = ingredient
                                .toLowerCase()
                                .replace(/^.*\bof\b\s*/, "");
                            if (wordsAfterOf) {
                                ingredientSet.add(wordsAfterOf);
                            }
                        });
                    }

                    if (recipe.calories) {
                        minCalories = Math.min(minCalories, recipe.calories);
                        maxCalories = Math.max(maxCalories, recipe.calories);
                    }
                });

                setCuisines([...cuisineSet]);
                setIngredients([...ingredientSet]);

                const range = [];
                for (
                    let i = Math.floor(minCalories / 100) * 100;
                    i <= Math.ceil(maxCalories / 100) * 100;
                    i += 100
                ) {
                    range.push(i);
                }
                setCaloriesRange(range);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (item) => {
        setPopupContent(item);
    };

    const handleClosePopup = () => {
        setPopupContent(null);
    };

    const handleCuisineClick = (cuisine) => {
        navigate(`/filteredResults/cuisine/${cuisine}`);
    };

    const handleIngredientClick = (ingredient) => {
        const selectedIndex = selectedIngredients.indexOf(ingredient);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedIngredients, ingredient];
        } else {
            newSelected = selectedIngredients.filter(
                (item) => item !== ingredient
            );
        }

        setSelectedIngredients(newSelected);

        // Save selected ingredients to sessionStorage
        sessionStorage.setItem(
            "selectedIngredients",
            JSON.stringify(newSelected)
        );
    };

    const handleMinCaloriesChange = (e) => {
        setSelectedMinCalories(e.target.value);
    };

    const handleMaxCaloriesChange = (e) => {
        setSelectedMaxCalories(e.target.value);
    };

    const handleApplyFilters = () => {
        // Save selected ingredients and calories to sessionStorage
        sessionStorage.setItem(
            "selectedIngredients",
            JSON.stringify(selectedIngredients)
        );
        sessionStorage.setItem("selectedMinCalories", selectedMinCalories);
        sessionStorage.setItem("selectedMaxCalories", selectedMaxCalories);

        if (selectedIngredients.length > 0) {
            navigate("/filteredResults/ingredients");
        } else if (selectedMinCalories && selectedMaxCalories) {
            navigate("/filteredResults/calories");
        } else {
            navigate("/filteredResults/caloriesIngredients");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-wrap justify-center p-4">
            <button
                onClick={() => handleItemClick("cuisine")}
                className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Cuisine
            </button>
            <button
                onClick={() => handleItemClick("ingredientCalories")}
                className="m-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
                Ingredients & Calories
            </button>

            {popupContent && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-lg max-w-lg max-h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">
                                {popupContent === "cuisine"
                                    ? "Cuisines"
                                    : "Ingredients & Calories"}
                            </h2>
                            <button
                                onClick={handleClosePopup}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        {popupContent === "cuisine" && (
                            <div className="flex flex-wrap">
                                {cuisines.map((cuisine) => (
                                    <button
                                        key={cuisine}
                                        onClick={() =>
                                            handleCuisineClick(cuisine)
                                        }
                                        className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        {cuisine}
                                    </button>
                                ))}
                            </div>
                        )}
                        {popupContent === "ingredientCalories" && (
                            <div className="flex flex-wrap">
                                <div className="flex flex-col w-full">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Ingredients
                                    </h3>
                                    <div className="max-h-64 overflow-y-auto">
                                        {ingredients.map((ingredient) => (
                                            <label
                                                key={ingredient}
                                                className="m-2 p-2 bg-green-500 text-white rounded hover:bg-green-700 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mr-2 cursor-pointer"
                                                    checked={selectedIngredients.includes(
                                                        ingredient
                                                    )}
                                                    onChange={() =>
                                                        handleIngredientClick(
                                                            ingredient
                                                        )
                                                    }
                                                />
                                                {ingredient}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col w-full mt-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Calories
                                    </h3>
                                    <label className="m-2 p-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">
                                        Min Calories:
                                        <select
                                            value={selectedMinCalories}
                                            onChange={handleMinCaloriesChange}
                                            className="ml-2 p-1 rounded"
                                        >
                                            <option value="">Any</option>
                                            {caloriesRange.map((cal) => (
                                                <option key={cal} value={cal}>
                                                    {cal}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="m-2 p-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">
                                        Max Calories:
                                        <select
                                            value={selectedMaxCalories}
                                            onChange={handleMaxCaloriesChange}
                                            className="ml-2 p-1 rounded"
                                        >
                                            <option value="">Any</option>
                                            {caloriesRange.map((cal) => (
                                                <option key={cal} value={cal}>
                                                    {cal}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <button
                                        onClick={handleApplyFilters}
                                        className="m-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
