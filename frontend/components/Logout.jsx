import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Logout = () => {
  const navigation = useNavigate();
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/logout', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 201) {
          document.cookie = 'jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.removeItem('jwtoken');
          setAuthUser(null); // Update authentication state
          navigation('/login');
          console.log('Logout successful');
        } else {
          const data = await response.json();
          console.error('Logout failed:', data.message);
          // Handle logout failure
        }
      } catch (error) {
        console.error('Error during logout:', error);
        // Handle other errors as needed
      }
    };

    logoutUser();
  }, [navigation, setAuthUser]);

  return <div>Welcome to Logout Page</div>;
};

export default Logout;
