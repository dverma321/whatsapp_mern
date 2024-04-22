import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {

        const getConversation = async function () {

            try {

                const URI = 'http://localhost:8000';
                const token = localStorage.getItem('jwtoken');

                setLoading(true);
                const res = await fetch(`${URI}/api/users` , {
                    
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