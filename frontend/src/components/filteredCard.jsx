import React from "react";
import { useNavigate } from "react-router-dom";

const FilteredCard = ({ recipe }) => {
    const navigate = useNavigate();

    const viewRecipeDetails = () => {
        navigate(`/recipeDetails/${recipe.id}`);
    };

    return (
        <div
            className="flex flex-col items-center bg-blue_main border-8 border-blue_main rounded-lg shadow-lg hover:bg-blue-200  hover:border-blue-200 cursor-pointer m-4 w-60 h-80"
            onClick={viewRecipeDetails}
        >
            <img
                className="object-cover w-full rounded-t-lg h-40"
                src={recipe.image}
                alt={recipe.recipeName}
            />
            <div className="flex flex-col justify-between p-4 leading-normal h-40">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {recipe.recipeName}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {recipe.cuisine}
                </p>
            </div>
        </div>
    );
};

export default FilteredCard;
