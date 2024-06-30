import React, { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import useAuth

const NaviBar = () => {
    const { currentUser } = useAuth(); // Get currentUser from useAuth
    let Links = [
        { name: "All recipes", link: "/all-recipes" },
        { name: "About Us", link: "/about-us" },
    ];

    // Add wishlist link if user is logged in
    if (currentUser) {
        Links.push({ name: "Wishlist", link: "/wishlist" });
    }

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
                        <p className="text-sm font-overlock font-bold text-textcolor">
                            Effortless Recipes for Every Ingredient
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-purple-200 px-2">
                <div className="flex justify-center">
                    <div className="flex justify-center flex-grow">
                        {/* Navigation links */}
                        <div className="w-40"></div>
                        <ul
                            className={`md:flex md:items-center ${
                                isOpen ? "block" : "hidden"
                            } md:block`}
                        >
                            {Links.map((link, index) => (
                                <li
                                    key={index}
                                    className="font-overlock font-bold text-textcolor mx-4"
                                >
                                    <a href={link.link}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex  items-center ml-3">
                        {currentUser ? (
                            <div className="flex ">
                                <img
                                    src="/userlogo.png"
                                    alt="User Icon"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-textcolor ml-3">
                                    {currentUser.email}
                                </span>
                            </div>
                        ) : (
                            <button
                                className="bg-orange_main font-overlock font-bold text-textcolor py-2 px-4 rounded-3xl"
                                onClick={() => navigate("/signup")}
                            >
                                Signup
                            </button>
                        )}

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
        </div>
    );
};

export default NaviBar;
