import React from 'react';
import useGetMessages from '../components/Messages/useGetMessages';
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../src/zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Check if the message sender ID matches the authenticated user's ID
  const fromMe = message.senderId === authUser._id;

  // Determine the chat class name based on whether the message is from the current user
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';

  // Set the profile picture based on whether the message is from the current user
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilepic;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img alt="Profile Pic" src={profilePic} />
        </div>
      </div>
      <div className="chat-bubble">{message.message}</div>
      <div className="chat-footer opacity-50 flex gap-1">Seen at 12:46</div>
    </div>
  );
};

export default Message;
