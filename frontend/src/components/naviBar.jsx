import React, { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NaviBar = () => {
    let Links = [
        { name: "All recipes", link: "/all-recipes" },
        { name: "About Us", link: "/about-us" },
    ];

    let [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className="bg-pink_main flex flex-col items-center py-3">
                <div className="flex items-center ">
                    <img src={logo} alt="logo" className="w-20 h-30" />
                    <div>
                        <h1 className="text-3xl font-baloo text-textcolor">
                            CanCook?
                        </h1>
                        <p className="text-sm font-overlock font-bold  text-textcolor">
                            Effortless Recipes for Every Ingredient
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-purple-200 px-2">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Navigation links */}
                    <ul
                        className={`md:flex md:items-center  ${
                            isOpen ? "block" : "hidden"
                        } md:block`}
                    >
                        {Links.map((link, index) => (
                            <li
                                key={index}
                                className="font-overlock font-bold text-textcolor"
                            >
                                <a href={link.link}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="bg-orange_main font-overlock font-bold text-textcolor py-2 px-4 rounded-3xl"
                        onClick={() => navigate("/Signup")}
                    >
                        Signup
                    </button>

                    {/* Menu bar -- responsive navbar */}
                    <div className="md:hidden flex items-center p-3">
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer"
                        >
                            {isOpen ? (
                                <XMarkIcon className="w-7 h-7" />
                            ) : (
                                <Bars3BottomRightIcon className="w-7 h-7" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NaviBar;
