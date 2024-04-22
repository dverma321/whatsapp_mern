import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetMessages from '../Messages/useGetMessages';
import useConversation from '../../src/zustand/useConversation';
import toast from 'react-hot-toast';
import useGetConversations from '../Messages/useGetConversations';
import { useAuthContext } from '../../context/AuthContext';


const SearchBar = () => {

  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const {authUser} = useAuthContext();


  const handleSearch =  (e) => {

    e.preventDefault();    

    if (!search) return toast.error("Please type something...")
    if (search.length < 3) {
      return toast.error("Search must be atleast 3 characters long...")
    }

    const conversation = conversations.find((c) => c.name && c.name.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')

    }
    else {
      return toast.error('No Search Result Found');
    }
  }


  return (
    <>
    <div className='p-2 uppercase font-bold text-sm'>Welcome : {authUser.fullname}</div>
    <form onSubmit={handleSearch} className='flex items-center gap-2'>
      <input type='text'
        className='input input-bordered rounded-full'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' style={{background: '#85DFC8', padding:'3%', margin:'2%'}}>
        <FaSearch />
      </button>


    </form>
    </>
  )
}

export default SearchBar