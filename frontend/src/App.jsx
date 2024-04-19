import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider, useAuthContext } from '../context/AuthContext.jsx';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Home from '../components/Home';
import Logout from '../components/Logout';

import MessageContainer from '../components/MessageContainer';
import Sidebar from '../components/Sidebar';
import MessageBody from '../components/MessageBody';
import { Toaster } from 'react-hot-toast';
import LogoutButton from '../components/Sidebar/LogoutButton.jsx';

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
                    <Route path="/sidebar" element={<Sidebar />} />
                    <Route path='/logout' element={<Logout />} />

                   
                    {/* Private route for messagebody */}
                    <Route
                        path="/messagebody"
                        element={authUser ? <MessageBody /> : <Navigate to="/login" />}
                    />


                </Routes>
                <Toaster />


        </div>
    );
}

export default App;
