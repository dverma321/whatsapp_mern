import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const storedToken = (localStorage.getItem("userData.token")) || null;

    const [authUser, setAuthUser] = useState(storedToken);

      // Effect to check if user data exists in localStorage on component mount
      useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            // User data exists in localStorage, parse and set it
            const userData = JSON.parse(storedUserData);
            setAuthUser(userData);
        }
    }, []);
    

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}


