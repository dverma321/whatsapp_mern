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
        setLoading(true);

            
            try {
                const URI = 'http://localhost:8000';
                const token = localStorage.getItem('userData.jwtoken');

                const local_server = import.meta.env.VITE_LOCAL_SERVER;
                const backend_server = import.meta.env.VITE_BACKEND_SERVER;
                const apiUrl = import.meta.env.DEV ? local_server : backend_server;
                console.log("apiurl ", apiUrl);               

                const data = await fetch(`${apiUrl}/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',                        
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