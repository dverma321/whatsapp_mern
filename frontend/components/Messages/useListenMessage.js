import React, { useEffect } from 'react'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../src/zustand/useConversation'

const useListenMessage = () => {

    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation();

    useEffect(() => {

        socket?.on("newMessage", (newMessage)=> {
            newMessage.shouldShake = true;           
            setMessages([...messages, newMessage]);
        })

        // clean up function

        return () => socket?.off("newMessage")

    }, [socket, messages, setMessages])

    return { messages, setMessages };


}

export default useListenMessage