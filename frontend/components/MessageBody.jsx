import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useAuthContext } from '../context/AuthContext';
import '../components/MessageBody.css';

const MessageBody = () => {

  const { authUser } = useAuthContext();

  return (
    <>

      <div className="flex messageBodyClass" style={{ height: '550px' }}>
        {/* showing User name  */}

        <Sidebar />
        <MessageContainer />
      </div>
    </>

  );
};

export default MessageBody;
