import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate=useNavigate();
  const {token,setToken,userData} =useContext(AppContext)
  const [showMenu,setShowMenu]=useState(false)

   const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
   }
  
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo}alt=""/>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m:auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
        <li className='py-1'>ALL DOCTORS</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m:auto hidden'/>
        </NavLink>
        <NavLink to ='/about'>
        <li className='py-1'>ABOUT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m:auto hidden'/>
        </NavLink>
        <NavLink to ='/contact'>
        <li className='py-1'>CONTACT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 mx-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
       {token  && userData ?
       <div className='flex items-center gap-2 cursor-pointer group relative'>
        <img className='w-8 rounded-full' src={userData.image} alt =""/>
        <img className='w-2.5 'src={assets.dropdown_icon} alt =""/>
        
       <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
          <p onClick={()=>navigate('my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
          <p onClick={()=>navigate('my-appointments')}className='hover:text-black cursor-pointer'>My Appointments</p>
          <p onClick={logout}className='hover:text-black cursor-pointer'>Logout</p>

          </div>
</div>
</div>
     : (
      <button
        onClick={() => navigate('/login')}
        className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
      >
        Create account
      </button>
    )
      }
  {/* Menu Icon */}
<img
  onClick={() => setShowMenu(true)}
  className="w-6 md:hidden cursor-pointer"
  src={assets.menu_icon}
  alt="menu"
/>

{/* Mobile Menu */}
<div
  className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out md:hidden ${
    showMenu ? 'visible opacity-100' : 'invisible opacity-0'
  }`}
>
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
    onClick={() => setShowMenu(false)}
  ></div>

  {/* Sidebar Menu */}
  <div
    className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
      showMenu ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-6 border-b">
      <img className="w-36" src={assets.logo} alt="logo" />
      <img
        className="w-6 cursor-pointer"
        onClick={() => setShowMenu(false)}
        src={assets.cross_icon}
        alt="close"
      />
    </div>

    {/* Navigation */}
    <ul className="flex flex-col gap-3 px-5 mt-6 text-[16px] font-medium text-gray-800">
      <NavLink onClick={() => setShowMenu(false)} to="/">
        <p className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-all">HOME</p>
      </NavLink>
      <NavLink onClick={() => setShowMenu(false)} to="/doctors">
        <p className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-all">ALL DOCTORS</p>
      </NavLink>
      <NavLink onClick={() => setShowMenu(false)} to="/about">
        <p className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-all">ABOUT</p>
      </NavLink>
      <NavLink onClick={() => setShowMenu(false)} to="/contact">
        <p className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-all">CONTACT</p>
      </NavLink>
    </ul>
  </div>
</div>


       
      </div>
    </div>
  )
}

export default Navbar
