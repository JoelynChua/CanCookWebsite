import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="flex justify-center mt-0">
            <button
                onClick={() => handleItemClick("cuisine")}
                className="m-1 p-2 bg-blue-200 text-black rounded-3xl hover:bg-blue-300 border-gray-300"
            >
                Cuisine
            </button>
            <button
                onClick={() => handleItemClick("ingredientCalories")}
                className="m-1 p-2 bg-green-200 text-black rounded-3xl hover:bg-green-300  border-gray-300 hover:text-green-700"
            >
                Ingredients & Calories
            </button>

            {popupContent && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
                    <div className="relative bg-beige_main p-6 rounded-lg shadow-xl max-w-lg max-h-full overflow-y-auto z-50">
                        <div className="flex justify-between items-center mb-4 ">
                            <h2 className="text-xl font-semibold">
                                {popupContent === "cuisine"
                                    ? "Cuisines"
                                    : "Ingredients & Calories"}
                            </h2>
                            <button
                                onClick={handleClosePopup}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <svg
                                    className="w-6 h-6 bg-white hover:bg-gray-200"
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
                            <div className="flex flex-wrap gap-4">
                                {cuisines.map((cuisine) => (
                                    <button
                                        key={cuisine}
                                        onClick={() =>
                                            handleCuisineClick(cuisine)
                                        }
                                        className="px-4 py-2 bg-blue-100 text-black rounded-full border border-blue-300 hover:bg-blue-200 hover:text-black"
                                    >
                                        {cuisine}
                                    </button>
                                ))}
                            </div>
                        )}
                        {popupContent === "ingredientCalories" && (
                            <div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Ingredients
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {ingredients.map((ingredient) => (
                                            <label
                                                key={ingredient}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIngredients.includes(
                                                        ingredient
                                                    )}
                                                    onChange={() =>
                                                        handleIngredientClick(
                                                            ingredient
                                                        )
                                                    }
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                />
                                                <span className="text-gray-700">
                                                    {ingredient}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Calories
                                    </h3>
                                    <div className="flex space-x-4">
                                        <select
                                            value={selectedMinCalories}
                                            onChange={handleMinCaloriesChange}
                                            className="form-select block w-full mt-1"
                                        >
                                            <option value="">Min</option>

                                            {caloriesRange.map((cal) => (
                                                <option key={cal} value={cal}>
                                                    {cal}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={selectedMaxCalories}
                                            onChange={handleMaxCaloriesChange}
                                            className="form-select block w-full mt-1"
                                        >
                                            <option value="">Max</option>

                                            {caloriesRange.map((cal) => (
                                                <option key={cal} value={cal}>
                                                    {cal}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={handleApplyFilters}
                                    className="w-full bg-green-300 text-black py-2 rounded-full hover:bg-green-400 border-gray-300 hover:text-black"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
