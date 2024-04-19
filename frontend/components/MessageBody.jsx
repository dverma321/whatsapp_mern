import React from 'react'
import MessageContainer from './MessageContainer'
import Sidebar from './Sidebar'
import 'daisyui/dist/full.css';


const MessageBody = () => {
  return (
    <>
     <div className="flex" style={{height:'500px'}}>
    <Sidebar />
    <MessageContainer />
      
    </div>
    </>
  )
}

export default MessageBody