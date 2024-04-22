import React, { useEffect, useState } from 'react';
import useConversation from '../../src/zustand/useConversation.js';

import './Conversation.css';
import emojis from '../utils/emoji.js';
import { useSocketContext } from '../../context/SocketContext.jsx';
import useGetConversations from '../Messages/useGetConversations.js';

const Conversations = () => {
  const [users, setUsers] = useState(null);

  // useGetConversation()

  const {loading, conversations} = useGetConversations();

  // for use of different different emojis

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };


  useEffect(() => {
    const callGetData = async () => {
      try {
        const URI = 'http://localhost:8000';
        const token = localStorage.getItem('jwtoken');

        const data = await fetch(`${URI}/api/users/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const response = await data.json();
        setUsers(response); // Set the users state with the fetched data

      } catch (error) {
        console.error('Error while getting users from the backend:', error);
      }
    };

    callGetData();
  }, []);

    // for selected user

    const {selectedConversation, setSelectedConversation} = useConversation()
    // console.log("selected conversation is : ", selectedConversation);  
    
    // checking online users

    const {onlineUsers} = useSocketContext();
     

  return (
    <>
     <div className='conversation-container'>
      {users && users.map((user, index) => (
        <div
          key={index}
          className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${selectedConversation?._id === user._id ? 'bg-yellow-500 text-white font-bold' : 'hover:bg-black'}`}
          // onClick={() => handleUserClick(user)}
          onClick={() => setSelectedConversation(user)}
        >

          <div className={`avatar ${onlineUsers.includes(user._id) ? 'online' : 'offline'}`}>
          
            <div className='w-12 rounded-full'>
              <img src={user.profilepic} alt={`user-avatar-${user._id}`} />
            </div>
          </div>
      
          <div className='flex flex-col flex-1'>
            <div className='flex justify-between gap-3'>
              <p className='text-gray font-bold username'>{user.name}</p>
              <span>{getRandomEmoji()}</span>
            </div>

          </div>
        </div>
      ))}
      
      <div className='divider my-0 py-0 h-1' />
      </div>
    </>
  );
};

export default Conversations;
