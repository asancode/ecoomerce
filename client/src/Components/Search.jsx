import React from 'react'
import { IoSearchSharp } from "react-icons/io5";


const Search = () => {
  return (
    <div className='searchbox w-[100%] h-[50px] bg-[#e5e5e5] rounded-md relative py-2'>
        <input type='text' placeholder='Search for Products...' className='w-full px-4 h-[35px] focus:outline-none bg-inherit p-2 text-[15px]'/>
      <button className=' absolute top-[8px] right-[5px] z-50 w-[37px] min-w-[37px] h-[37px] '><IoSearchSharp className='text-[#4e4e4e] text-[22px]'/></button>
    </div>
  )
}

export default Search
