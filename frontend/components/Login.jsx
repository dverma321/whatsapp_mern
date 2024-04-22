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


      const data = await fetch("http://localhost:8000/api/auth/login" , {
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
            <label htmlFor='username' className='text-sm font-medium text-gray-700'>Username</label>
            <input id='username' type='text' placeholder='Enter username' className='input input-bordered h-10' style={{border: 'none', margin: '5px'}}
            value={uname}
            name ="uname"
            onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password</label>
            <input id='password' type='password' placeholder='Enter password' className='input input-bordered h-10' style={{border: 'none', margin: '5px'}}
            value={password}
            name="password"
            onChange={handleChange}
            />
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
