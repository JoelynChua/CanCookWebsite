// Source: https://www.youtube.com/watch?v=EcNXSlcGG_I

import React, { useState } from 'react';

export default function Card({ recipeName, recipeImage, prop }) {
    const [editable, setEditable] = useState(false);

    const handleClick = () => {
        setEditable(!editable);
    };

    return (
        <div className='flex items-center justify-center text-3xl md:text-7xl p-6 md:p-10 w-80 md:w-96 h-80 bg-slate-300 drop-shadow-md rounded-md overflow-hidden'>
            {/* Recipe photo */}
            <div className='relative w-60 h-60 flex items-center justify-center'>
                <img className="absolute w-full h-full object-cover rounded-lg" src={recipeImage} alt={recipeName} />
            </div>

            {/* Display the recipe title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 text-center font-bold text-xl break-words">
                <span className="underline">{recipeName}</span>
            </div>

            {/* Edit button and input */}
            {/* <div onClick={handleClick} className='flex mt-2'>
                    <div className="text-sm cursor-pointer text-gray-500">
                        {editable ? 'close | update' : 'edit'}
                    </div>
                    <input
                        className="text-sm w-15 bg-slate-100 ml-2"
                        type={!editable ? "hidden" : "text"}
                        value={prop}
                        readOnly
                    />
                </div> */}
        </div>

    );
}
