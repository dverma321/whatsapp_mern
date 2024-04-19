import React, { useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import useConversation from '../src/zustand/useConversation';
import useGetMessages from '../components/Messages/useGetMessages';


const MessageContainer = () => {
  const noChatSelected = false; // Change this based on your logic

  // using Global state

  const { selectedConversation, setSelectedConversation } = useConversation();

  // using use effect to remove unwanted state

  useEffect(() => {

    return () => setSelectedConversation(null)

  }, [setSelectedConversation])

  // Getting Messages

  const { messages, loading} = useGetMessages();

  // console.log("messages are : ", messages);

  return (
    <div style={{ height: '500px', width: '500px', border: '2px solid #000', position: 'relative' }}>


      {/* Dynamic header */}
      {noChatSelected ? (
        <div className='px-4 mb-2 py-2 text-center' style={{ background: 'gray' }}>
          Start messaging here
        </div>
      ) : (
        <div className='px-4 mb-2 ' style={{ background: '#4a5568', position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', fontSize: '16px', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <span className='label-text'>To:</span>
          {/* Conditional rendering to check if selectedConversation exists */}
          {selectedConversation ? (
            <span className='text-gray-900 font-bold'>{selectedConversation.name}</span>
          ) : (
            <span>No Conversation Selected</span>
          )}
        </div>

      )}


      <div className='border border-gray-300 rounded-lg p-2' style={{ border: '2px solid red' }}>
        <div className='overflow-auto px-4 p-2' style={{ border: '2px solid green', height: '400px', position: 'relative' }}>


          {/* Importing Message */}

          {selectedConversation ? (
            <>
           {messages.length > 0 && messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}


             
            </>
          ) : (
            <span>No Conversation is selected</span>
          )}
        </div>
        

        {selectedConversation ?  (
          <>
            <MessageInput />
          </>
        ): 
        (
          <p></p>
        )}

      </div>
    </div>
  );
};

export default MessageContainer;
