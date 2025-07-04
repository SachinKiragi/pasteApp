import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 bg-gray-800 p-3 justify-center'>
      <NavLink 
        className={ ({isActive}) => `text-[1.2rem]  ${isActive ? '!text-blue-500 font-bold' : '!text-white'}`}
        to="/">
        Home
      </NavLink>
      <NavLink 
      className={ ({isActive}) => `text-[1.2rem] ${isActive ? "!text-blue-500 font-bold" : "!text-white"}`}
      to="/pastes">
        pastes
      </NavLink>
    </div>
  )
}

export default Navbar