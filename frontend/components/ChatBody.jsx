import React from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useAuthContext } from '../context/AuthContext';
import '../components/ChatBody.css';

const ChatBody = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='chat-body-container messageBodyClass'>
      <Sidebar />
      <MessageContainer />
    </div>   

  );
};

export default ChatBody;
