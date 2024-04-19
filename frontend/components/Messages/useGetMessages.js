import React, { useEffect, useState } from 'react'
import useConversation from '../../src/zustand/useConversation.js'
import { useAuthContext } from '../../context/AuthContext.jsx';


const useGetMessages = () => {

    const [loading, setLoading] = useState(false)

    const {messages, setMessages, selectedConversation} = useConversation();

    const {authUser} = useAuthContext();

    // use useEffect hook for display at first

    useEffect(() => {

        const getMessages = async (e) => {
            
            try {

                setLoading(true);

                const URI = "http://localhost:8000"
                const token = localStorage.getItem('jwtoken');

                const data = await fetch(`${URI}/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authUser}`,
                    },
                    credentials: 'include',

                })

                const response = await data.json();

                setMessages(response);


            } catch (error) {

                console.log("Internal server error - while getting messages", error);

            }
            finally {
                setLoading(false)
            }
        }

       if(selectedConversation?._id) getMessages()

    }, [selectedConversation?._id, setMessages]) // whenever selected user is changes run the use effect hook

    return {messages, loading}


}

export default useGetMessages