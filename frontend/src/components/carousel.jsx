import React, { useState, useEffect } from 'react';
import Card from "./card";
import { getAllRecipes } from "../services/recipeService";

export default function Carousel() {
    const [recipeList, setRecipeList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        getRecipes();
        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        // Set title for tab
        document.title = "HomePage";
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const getRecipes = () => {
        getAllRecipes()
            .then(response => {
                setRecipeList(response);
            })
            .catch(error => console.error("Error fetching recipes:", error));
    };

    const updateVisibleCards = () => {
        const width = window.innerWidth;
        if (width >= 1200) {
            setVisibleCards(3);
        } else if (width >= 800) {
            setVisibleCards(2);
        } else {
            setVisibleCards(1);
        }
    };

    const handleLeftClick = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + recipeList.length) % recipeList.length);
    };

    const handleRightClick = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % recipeList.length);
    };

    const getVisibleRecipes = () => {
        const start = activeIndex;
        const end = start + visibleCards;
        return [...recipeList, ...recipeList].slice(start, end);
    };

    return (
        <div>
            <div className="flex items-left mb-4">
                <p class="font-serif text-2xl font-bold underline">What we're loving now</p>
            </div>
            <div className="flex items-center">
                <div className="text-xl md:text-5xl cursor-pointer" onClick={handleLeftClick}>{"<"}</div>
                <div className="flex overflow-x-auto space-x-4">
                    {/* .map is used for array */}
                    {getVisibleRecipes().map((recipe, index) => (
                        <div key={index}>
                            <Card
                                id = {recipe.id}
                                recipeName={recipe.recipeName}
                                recipeImage={recipe.image}
                            />
                        </div>
                    ))}
                </div>
                <div className="text-xl md:text-5xl cursor-pointer" onClick={handleRightClick}>{">"}</div>
            </div>
        </div>
    );
}
