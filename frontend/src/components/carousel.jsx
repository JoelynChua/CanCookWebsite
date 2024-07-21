import React, { useState, useEffect } from "react";
import Card from "./card";
import { getAllRecipes } from "../services/recipeService";

export default function Carousel() {
    const [recipeList, setRecipeList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        getRecipes();
        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        document.title = "HomePage";
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    const getRecipes = async () => {
        try {
            const response = await getAllRecipes();
            setRecipeList(response);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const updateVisibleCards = () => {
        const width = window.innerWidth;
        if (width >= 1400) {
            setVisibleCards(3);
        } else if (width >= 1000) {
            setVisibleCards(2);
        } else {
            setVisibleCards(1);
        }
    };

    const handleLeftClick = () => {
        setActiveIndex(
            (prevIndex) =>
                (prevIndex - 1 + recipeList.length) % recipeList.length
        );
    };

    const handleRightClick = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % recipeList.length);
    };

    const getVisibleRecipes = () => {
        const start = activeIndex;
        const end = start + visibleCards;
        return [...recipeList, ...recipeList].slice(start, end);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-left mb-4">
                <p className="font-serif text-2xl font-bold text-textcolor ml-5 ">
                    What we're loving now...
                </p>
            </div>
            <div className="flex items-center justify-between">
                <div
                    className="text-xl md:text-5xl cursor-pointer"
                    onClick={handleLeftClick}
                >
                    &#8249;
                </div>
                <div className="flex overflow-hidden space-x-8">
                    {getVisibleRecipes().map((recipe, index) => (
                        <Card
                            key={index}
                            id={recipe.id}
                            recipeName={recipe.recipeName}
                            recipeImage={recipe.image}
                        />
                    ))}
                </div>
                <div
                    className="text-xl md:text-5xl cursor-pointer"
                    onClick={handleRightClick}
                >
                    &#8250;
                </div>
            </div>
        </div>
    );
}
