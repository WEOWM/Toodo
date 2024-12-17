import React from 'react'
import { CgUserlane } from "react-icons/cg";

const Header = () => {
  return (
    <div className='w-full h-[5rem] bg-[#FFFFFF] shadow-lg fixed flex justify-between items-center px-3'>
        <p className='animate-bounce'>
            <img className='w-20' src="https://logos.flamingtext.com/City-Logos/Todo-Logo.png" alt="" srcset="" />
        </p>

        <div className='flex items-center gap-2'>
        <CgUserlane />
            USER Name
        </div>
    </div>
  )
}

export default Header
