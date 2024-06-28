import React, { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const NaviBar = () => {
  let Links = [
    {name: 'Home', link: '/'},
    {name: 'Wishlist', link: '/Wishlist'}
  ]

  //set the state for switch between X icon and menu bar icon
  let [isOpen, setisOpen] = useState(false)
  const navigate = useNavigate();

  return (
    // <div>naviBar</div>
    // <div className = 'bg-[#e7e7e7d1]'>
      <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg-pink-300'>

        {/* App name + logo */}
        <h1>CanCook?</h1>
    
      {/* Menu bar -- responsive navbar*/}
      <div onClick={() => setisOpen(!isOpen)} className='w-7 h-7 absolute right-8 top 6 cursor-pointer items-center md:hidden'>
        {
          isOpen ? <XMarkIcon/> : <Bars3BottomRightIcon/>
        }
   
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

