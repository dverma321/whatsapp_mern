import React, { useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import useConversation from '../src/zustand/useConversation';
import useGetMessages from '../components/Messages/useGetMessages';
import useListenMessage from './Messages/useListenMessage';
import '../components/MessageContainer.css';


const MessageContainer = () => {
  const noChatSelected = false; // Change this based on your logic

  // using Global state

  const { selectedConversation, setSelectedConversation } = useConversation();

  // using use effect to remove unwanted state

  useEffect(() => {

    return () => setSelectedConversation(null)

  }, [setSelectedConversation])

  // Getting Messages

  const { messages, loading } = useGetMessages();

  // console.log("messages are : ", messages);

  // automatic scrolling to the last end of the messages in each user

  const lastMessageRef = useRef();

  useEffect(() => {

    setTimeout(() => {

      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" })

    }, 100)
  }, [messages])

  // immediately listen the message

  useListenMessage()


  return (
    <div style={{ height: '550px', width: '500px', position: 'relative' }}>


      {/* Dynamic header */}
      {noChatSelected ? (
        <div className='px-4 mb-2 py-2 text-center' style={{ background: 'gray' }}>
          Start messaging here
        </div>
      ) : (
        <div className='px-4 mb-2 ' style={{ background: '#4a5568', position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff', fontSize: '16px', fontWeight: 'bold', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {selectedConversation && <span className='label-text p-2 m-2'>To:</span>}
          {/* Conditional rendering to check if selectedConversation exists */}
          {selectedConversation ? (
            <span className='text-gray-900 font-bold uppercase'>{selectedConversation.name}</span>
          ) : (
            <span></span>
          )}
        </div>
      )}


      <div className='p-2'>
        <div className='overflow-auto px-4 p-2 showMessageBody'>

          {/* Importing Message */}

          {selectedConversation ? (
            <>
              {messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                  <Message message={message} />
                </div>
              ))}
            </>
          ) : (
            <span className='text-center'>No Conversation is selected</span>
          )}
        </div>

         {/* Divider line */}
         { selectedConversation ? (
         <div className='divider my-0 py-0 h-1' />
         ): ""}

         {/* Input Message  */}

        {selectedConversation ? (
          <>
            <MessageInput />
          </>
        ) :
          (
            ""
          )}

      </div>
    </div>
  );
};

export default MessageContainer;
