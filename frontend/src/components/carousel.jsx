import React, { useState, useEffect } from 'react';
import Card from "./card";
import { getAllRecipes } from "../services/recipeService";


export default function Carousel() {
    const [recipeList, setRecipeList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = () => {
        getAllRecipes()
            .then(response => {
                setRecipeList(response);
            })
            .catch(error => console.error("Error fetching recipes:", error));
    };

    const handleLeftClick = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + recipeList.length) % recipeList.length);
    };

    const handleRightClick = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % recipeList.length);
    };

    return (
        <div className="flex items-center">
            <div className="text-xl md:text-5xl cursor-pointer" onClick={handleLeftClick}>{"<"}</div>
            <div className="flex overflow-x-auto space-x-4">
                {recipeList.map((recipe, index) => (
                    <div key={index} className={index === activeIndex ? "block" : "hidden"}>
                        <Card
                            recipeName={recipe.recipeName}
                            recipeImage={recipe.image}
                        />
                    </div>
                ))}
            </div>
            <div className="text-xl md:text-5xl cursor-pointer" onClick={handleRightClick}>{">"}</div>
        </div>
    );
}
