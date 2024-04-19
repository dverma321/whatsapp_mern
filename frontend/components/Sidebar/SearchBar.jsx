import React from 'react'
import { FaSearch } from "react-icons/fa";



const SearchBar = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type='text' 
        className='input input-bordered rounded-full'
        placeholder='Search'
        />
        <button type='submit' className='btn  bg-sky-400 text-white'>
            <FaSearch />
        </button>

    </form>
  )
}

export default SearchBar