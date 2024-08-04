'use client'
import React from 'react'
import ThemeSwitchBtn from './ThemeSwitchBtn'
import Image from 'next/image'
import { HomeIcon } from '@heroicons/react/24/solid'
const NavBar = () => {
  return (
    
    <nav className='pt-3'>
      <div className='flex flex-row justify-center items-center max-w-full'>
        <div className='flex flex-row items-center justify-between w-10/12'>
          <a href='/' className='text-2xl font-bold text-gray-700 dark:text-gray-200'>
          <HomeIcon className='h-8 w-8' />
          </a>
          <ThemeSwitchBtn />
        </div>
       </div>
    </nav>
  )
}

export default NavBar