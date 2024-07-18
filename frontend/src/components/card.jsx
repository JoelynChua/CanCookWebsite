import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ id, recipeName, recipeImage }) {
    const navigate = useNavigate();

    const viewRecipeDetails = () => {
        navigate(`/recipeDetails/${id}`);
    };

    return (
        <div className="relative flex items-center justify-center p-6 w-80 h-80 bg-blue_main bg-opacity-60 shadow-lg rounded-lg overflow-hidden">
            {/* Recipe photo */}
            <div className="relative w-full h-full flex items-center justify-center">
                <img
                    className="absolute w-full h-full object-cover rounded-lg"
                    src={recipeImage}
                    alt={recipeName}
                />
            </div>

            {/* Display the recipe title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white py-2 px-4 text-center font-bold text-xl">
                <span
                    onClick={viewRecipeDetails}
                    className="cursor-pointer underline"
                >
                    {recipeName}
                </span>
            </div>
        </div>
    );
}
