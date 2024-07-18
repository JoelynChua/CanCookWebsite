// Source: https://www.youtube.com/watch?v=EcNXSlcGG_I

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ id, recipeName, recipeImage  }) {
    // const [viewDetails, setviewDetails] = useState(false);
    const navigate = useNavigate();

    // OnClick function to parse the recipeID into the url
    const viewRecipeDetails = () => {
        navigate(`/recipeDetails/${id}`);
    };


    return (
        <div className='flex items-center justify-center text-3xl md:text-7xl p-6 md:p-10 w-80 md:w-96 h-80 bg-slate-300 drop-shadow-md rounded-md overflow-hidden'>
            {/* Recipe photo */}
            <div className='relative w-60 h-60 flex items-center justify-center'>
                <img className="absolute w-full h-full object-cover rounded-lg" src={recipeImage} alt={recipeName} />
            </div>

            {/* Display the recipe title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center font-bold text-xl break-words">
                <span onClick={viewRecipeDetails} className="underline cursor-pointer ">{recipeName}</span>
            </div>

        </div>

    );
}
