import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {

        const getConversation = async function () {

            try {

                const URI = 'http://localhost:8000';
                const token = localStorage.getItem('userData.jwtoken');

                const local_server = import.meta.env.VITE_LOCAL_SERVER;
                const backend_server = import.meta.env.VITE_BACKEND_SERVER;
                const apiUrl = import.meta.env.DEV ? local_server : backend_server;
                console.log("apiurl ", apiUrl)


                setLoading(true);
                const res = await fetch(`${apiUrl}/api/users` , {
                    
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        credentials: 'include',
                });

                const data = await res.json();

                if(data.error)
                {
                    throw new Error(data.error)
                }

                setConversations(data);

            } catch (error) {

                toast.error('Error while getting useGetConversation hook : ', error);

            }

            finally {
                setLoading(false)
            }
        }

        getConversation()

    }, [])

    return {loading, conversations}


}

export default useGetConversations