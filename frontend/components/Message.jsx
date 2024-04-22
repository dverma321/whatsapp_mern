import React, { useEffect } from 'react';
import useGetMessages from '../components/Messages/useGetMessages';
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../src/zustand/useConversation';
import { useNavigate } from 'react-router-dom';
import { extractDateTime } from './utils/extractTime';
import '../components/Message.css';
import '../src/index.css';


const Message = ({ message }) => { // here message parameters are coming from useListenMessage.js
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const navigate = useNavigate();

  // Check if the message sender ID matches the authenticated user's ID
  const fromMe = message.senderId === authUser._id;

  // Determine the chat class name based on whether the message is from the current user
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';

  // Set the profile picture based on whether the message is from the current user
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilepic;

  let shakeClass = message.shouldShake ? "shake": "";

  // const bubbleBgColor = fromMe ? "bg-yellow-500" : "bg-sky-500";
  

  const formattedTime = extractDateTime(message.createdAt);
  

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt="Profile Pic" src={profilePic} />
        </div>
      </div>
      {/* <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div> */}
      <div className={`chat-bubble text-white ${fromMe ? 'chat-bubble-accent' : 'chat-bubble-primary'} ${shakeClass}`}>{message.message}</div>
      <div className="chat-footer opacity-50 flex gap-1">Seen at {formattedTime}</div>
    </div>
  );
};

export default Message;
