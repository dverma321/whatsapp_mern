import React, { useEffect, useState } from 'react';
import useConversation from '../../src/zustand/useConversation.js';

import './Users.css';
import emojis from '../utils/emoji.js';
import { useSocketContext } from '../../context/SocketContext.jsx';
import useGetConversations from '../Messages/useGetConversations.js';

const Users = () => {
  const [users, setUsers] = useState(null);

  // useGetConversation()

  const {loading, conversations} = useGetConversations();

  // for use of different different emojis

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };
  
    // for selected user

    const {selectedConversation, setSelectedConversation} = useConversation()
    // console.log("selected conversation is : ", selectedConversation);  
    
    // checking online users

    const {onlineUsers} = useSocketContext();
     

  return (
    <>
     <div className='conversation-container'>
      {conversations && conversations.map((user, index) => (
        <div
          key={index}
          className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer ${selectedConversation?._id === user._id ? 'bg-yellow-500 text-white font-bold' : 'hover:bg-black'}`}
          
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
    
      </div>
    </>
  );
};

export default Users;
