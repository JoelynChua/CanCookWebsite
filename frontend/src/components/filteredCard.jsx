import React from 'react';
import { useNavigate } from 'react-router-dom';

const FilteredCard = ({ recipe }) => {
    const navigate = useNavigate();

    const viewRecipeDetails = () => {
        navigate(`/recipeDetails/${recipe.id}`);
    };

    return (
        <div
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
            onClick={viewRecipeDetails}
        >
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={recipe.image}
                alt={recipe.recipeName}
            />

            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {recipe.recipeName}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {recipe.cuisine}
                </p>
            </div>
        </div>
    );
}

export default FilteredCard;
