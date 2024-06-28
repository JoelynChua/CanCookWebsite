import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

import logo from '../assets/logo.png';

import { useNavigate } from 'react-router-dom';


const NaviBar = () => {
  let Links = [
    { name: 'Home', link: '/' },
    { name: 'Wishlist', link: '/Wishlist' }
  ]

  //set the state for switch between X icon and menu bar icon
  let [isOpen, setisOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <div className='md:px-10 py-4 px-7 md:flex md:justify-between md:items-center bg-pink-200'>


      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center mb-4 md:mb-0">
        {/* Logo */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
          <img src={logo} alt="logo" className="w-20 h-20 md:w-24 md:h-24" />
        </div>

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
        <ul className = 'md:flex pl-9 md:pl-0 md:items-center md:pb-0 pb-12'>
          {
            Links.map(link => (
              <li className = 'font-semibold my-7 md:my-0 md:m1-8'>
                <a href= {link.link}>{link.name}</a>
              </li>
            ))
          }
        <button className='btn bg-pink text-white py-1 px-3 md:m1-8 rouded md:static'onClick={() => navigate('/Signup')}
        >Sign up</button>
        </ul>


    </div>
  )
}

export default NaviBar

