import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate(); // Initialize the navigate function

  const {setAuthUser} = useAuthContext();


  const [login, setLogin] = useState({
    uname:'',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value }); // Update the corresponding value in login state
  };

  const {uname, password} = login // Destructure value from the login state

  const onLogin = async (e)=> {
    e.preventDefault();

    const {uname, password} = login;

    try {

      if(!uname )
      {
        toast.error('Please fill the user name...')
        return
      }

      
      if(!password || password === null )
      {
        toast.error('Please fill the password...')
        return
      }

      const local_server = import.meta.env.VITE_LOCAL_SERVER;
      const backend_server = import.meta.env.VITE_BACKEND_SERVER;
      const apiUrl = import.meta.env.DEV ? local_server : backend_server;
      console.log("apiurl ", apiUrl)

      const data = await fetch(`${apiUrl}/api/auth/login` , {
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(login)
      })
  

      if(data.status === 400)
      {
        throw new Error('Invalid Credentials...')
      }

      const response = await data.json();
      console.log("Response from the backend is : ", response);

      toast.success('Login Successful');

     
      // Save complete user object (including JWT token) in localStorage
      localStorage.setItem('userData', JSON.stringify(response)); // Assuming your backend sends back the complete user object

        // Save JWT token in cookies
      document.cookie = `jwtoken=${response.token}; path=/`; // Set the cookie with path='/'

      //  setAuthUser(response.token);
      
       setAuthUser(response);
      
       navigate('/messagebody')
  
      
    } catch (error) {

      toast.error(error.message);
      
    }  
   

  }

  return (
    <div className=''>
    <div className='form-container'>

      <form onSubmit={onLogin}>

          <div className='form-group'>
            <label htmlFor='username' className='text-sm font-medium text-gray-700 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>            
            
            <input id='username' type='text' placeholder='Enter username' className='input input-bordered h-10' style={{border: 'none', margin: '5px'}}
            value={uname}
            name ="uname"
            onChange={handleChange}
            />
            </label>
          </div>
                   

          <div className='form-group'>
            <label htmlFor='password' className='text-sm font-medium text-gray-700 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input id='password' type='password' placeholder='Enter password' className='input input-bordered h-10' style={{border: 'none', margin: '5px'}}
            value={password}
            name="password"
            onChange={handleChange}
            />
            </label>
          </div>          

          
          <div className='form-group'>
            <button type='submit' className='btn btn-primary p-2 uppercase'>Login</button>
          </div>
        </form>
    </div>
    </div>
  );
};

export default Login;
