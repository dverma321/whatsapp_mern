import React, { useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { setAuthUser } = useAuthContext();
  const navigation = useNavigate();

  const logoutUser = async () => {
    try {

      const local_server = import.meta.env.VITE_LOCAL_SERVER;
      const backend_server = import.meta.env.VITE_BACKEND_SERVER;
      const apiUrl = import.meta.env.DEV ? local_server : backend_server;
      console.log("apiurl ", apiUrl)

      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.status === 201) {
        document.cookie = 'jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('userData');
        setAuthUser(null ); // Update authentication state
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

  return (
    <button type='button' className='cursor-pointer' onClick={logoutUser} style={{background: '#85DFC8', padding:'3%', margin:'2%', width:'20%'}}>
      <CiLogout className='w-6 h-6' />
    </button>
  );
};

export default LogoutButton;
