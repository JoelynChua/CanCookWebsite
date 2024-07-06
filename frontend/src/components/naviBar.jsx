import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import logo from '../assets/logo.png';

const NaviBar = () => {
  let Links = [
    { name: 'Home', link: '/' },
    { name: 'Wishlist', link: '/Wishlist' }
  ]

  //set the state for switch between X icon and menu bar icon
  let [isOpen, setisOpen] = useState(false)

  
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div>
            <div className="bg-pink_main flex flex-col items-center py-3">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="w-20 h-30" />
                    <div>
                        <h1 className="text-3xl font-baloo text-textcolor">
                            CanCook??
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
                        {currentUser ? (
                            <div className="w-40"></div> // Render this when currentUser is true
                        ) : (
                            <div className="w-10"></div> // Render this when currentUser is false
                        )}

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
                    <div className="flex items-center ml-3">
                        {currentUser ? (
                            <div className="relative">
                                <div
                                    className="flex cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <img
                                        src="/userlogo.png"
                                        alt="User Icon"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-textcolor ml-3">
                                        {currentUser.email}
                                    </span>
                                </div>
                                {/* Dropdown menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 left-1 mt-1 w-40 bg-beige_main rounded-md shadow-lg">
                                        <a
                                            href="/manage-account"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Manage Account
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                className="bg-orange_main font-overlock font-bold text-textcolor py-2 px-4 rounded-3xl"
                                onClick={() => navigate("/signup")}
                            >
                                Signup
                            </button>
                        )}


        {/* App name and headline */}
        <div className="text-center md:text-left">
          <h1 className='text-3xl font-black'>CanCook?</h1>
          <p className="text-sm">Effortless recipe for every ingredient</p>
        </div>
      </div>

      {/* Menu bar -- responsive navbar */}
      <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer items-center md:hidden'>
        {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
      </div>

      {/* Navigation links */}
      <ul className='md:flex md:items-center md:gap-8 md:ml-auto md:mr-auto'>
        {Links.map((link, index) => (
          <li key={index} className='font-semibold my-3 md:my-0'>
            <a href={link.link}>{link.name}</a>
          </li>
        ))}
        <li className="my-3 md:my-0">
          <button className='btn bg-pink-500 text-white py-1 px-3 rounded md:static'>Sign in</button>
        </li>
      </ul>

    </div>
  )
}

export default NaviBar

