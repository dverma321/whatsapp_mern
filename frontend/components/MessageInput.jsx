import React, { useState } from 'react';
import { RxPaperPlane } from 'react-icons/rx';
import useSendMessage from './Messages/useSendMessage.js';

const MessageInput = () => {

  const [message, setMessage] = useState("");

  const{loading, sendMessage} = useSendMessage();

  const handleSubmitMessage = async (e) => {

    e.preventDefault();

    if(!message) return;

    await sendMessage(message);
    setMessage(""); // set empty string after sending message
    

  }


  return (
    <form className='px-1 my-4 flex items-center' onSubmit={handleSubmitMessage}>
      <div className='w-full flex'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white'
          placeholder='Send a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type='submit'
          className='flex items-center justify-center h-full ml-2 border-2 border-yellow-500 rounded-lg p-2'
        >
          <RxPaperPlane />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
