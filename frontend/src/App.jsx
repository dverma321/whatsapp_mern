import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, useAuthContext } from '../context/AuthContext.jsx';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Home from '../components/Home';

import MessageContainer from '../components/MessageContainer';
import Sidebar from '../components/Sidebar';
import ChatBody from '../components/ChatBody';
import { Toaster } from 'react-hot-toast';
import LogoutButton from '../components/Sidebar/LogoutButton.jsx';
import './index.css'; // Import your CSS file


function App() {
    const { authUser } = useAuthContext(); // Destructure authUser from useAuthContext
    console.log("AuthUser : ", authUser);


    return (
        <div className='p-4 h-screen justify-center flex items-center'>

                <Routes>
                    <Route
                        path="/"
                        element={authUser ? <Navigate to="/messagebody" /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={authUser ? <Navigate to="/messagebody" /> : <Login />}
                    />

                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/messagecontainer" element={<MessageContainer />} />                 

                   
                    {/* Private route for messagebody */}
                    <Route
                        path="/messagebody"
                        element={authUser ? <ChatBody /> : <Navigate to="/login" />}
                    />


                </Routes>
                <Toaster />


        </div>
    );
}

export default App;
