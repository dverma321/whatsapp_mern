import React, { useState } from 'react'
import useConversation from '../../src/zustand/useConversation'

const useSendMessage = () => {


  const { messages, setMessages, selectedConversation } = useConversation()
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {

    const token = localStorage.getItem('userData.jwtoken');

    try {

      const URI = 'http://localhost:8000';

      const local_server = import.meta.env.VITE_LOCAL_SERVER;
      const backend_server = import.meta.env.VITE_BACKEND_SERVER;
      const apiUrl = import.meta.env.DEV ? local_server : backend_server;
      console.log("apiurl ", apiUrl)     

      const data = await fetch(`${apiUrl}/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }), // message from the input message body
        credentials: 'include',
      });

      const response = await data.json();

      setMessages([...messages, response]);


    } catch (error) {
      console.error('Error while getting user messages from the backend:', error);
    }

  }

  return {loading, sendMessage}

}

export default useSendMessage