import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {

    return useContext(SocketContext);

}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {

        if (authUser) {
            const socket = io("http://localhost:8000", {
                query: {
                    userId: authUser._id
                }
            });
            console.log("Socket initialized:", socket);
            setSocket(socket);

            // getOnlineUsers from the backend i.e who is online and offline

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);

            })

            //clean up function
            return () => socket.close();
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }

    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );




}