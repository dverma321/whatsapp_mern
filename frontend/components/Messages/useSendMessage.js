import React, { useState } from 'react'
import useConversation from '../../src/zustand/useConversation'

const useSendMessage = () => {


  const { messages, setMessages, selectedConversation } = useConversation()
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {

    const URI = 'http://localhost:8000';
    const token = localStorage.getItem('jwtoken');

    try {

      const data = await fetch(`${URI}/api/messages/send/${selectedConversation._id}`, {
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