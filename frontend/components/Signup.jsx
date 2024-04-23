import React, { useState } from 'react';
import './Signup.css';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [inputs, setInputs] = useState({
    uname: '',
    name: '',
    email: '',
    gender: '',
    phone: '',
    password: '',
    cpassword: ''

  })

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { authUser, setAuthUser } = useAuthContext(); // Destructure authUser and setAuthUser from useAuthContext


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { uname, name, email, gender, password, cpassword, phone } = inputs;


    try {
      // Validate input fields
      if (!uname || !name || !email || !password || !cpassword || !gender || !phone) {
        toast.error('Please fill all the fields.');
        return;
      }

      if (password !== cpassword) {
        toast.error("Password and confirm password don't match.");
        return;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
      }

      const local_server = import.meta.env.VITE_LOCAL_SERVER;
      const backend_server = import.meta.env.VITE_BACKEND_SERVER;
      const apiUrl = import.meta.env.DEV ? local_server : backend_server;
      console.log("apiurl ", apiUrl)


      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs)
      });

      if (res.status === 400) {
        throw new Error('Username is already Taken');
      }

      if (res.status === 401) {
        throw new Error('Email is already Taken');
      }

      if (res.status === 402) {
        throw new Error('Phone Number is already Taken');
      }

      const data = await res.json();
      console.log('response received:', data);

      // Save JWT token in localStorage
      localStorage.setItem('jwtoken', data.token); // Assuming your backend sends back a token field

      // Save JWT token in cookies
      document.cookie = `jwtoken=${data.token}; path=/`; // Set the cookie with path='/'

      // Update authUser after localStorage update
      
      setAuthUser(data);


      navigate('/messagebody');

      toast.success('User Signup Successfully');



    }
    catch (error) {
      toast.error(error.message);
    }


  }


  return (
    <div className=''>
      <div className='form-container'>

        <form onSubmit={handleSubmit}>
          <h1 className='p-2 text-3xl text-center uppercase'>Signup Route</h1>
          <div className='form-group'>
            <label htmlFor='username' className='text-sm font-medium text-gray-700'>Username</label>
            <input id='username' type='text' name='uname' placeholder='Enter username' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.uname}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='fullName' className='text-sm font-medium text-gray-700'>Full Name</label>
            <input id='fullName' type='text' name='name' placeholder='Enter full name' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.name}
              onChange={handleChange}

            />
          </div>

          <div className='form-group'>
            <label htmlFor='gender' className='text-sm font-medium text-gray-700'>Gender</label>
            <select id='gender' name='gender' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.gender}
              onChange={handleChange}
            >
              <option value=''>Select gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='mobileNumber' className='text-sm font-medium text-gray-700'>Mobile Number</label>
            <input id='mobileNumber' name='phone' type='number' placeholder='Enter mobile number' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.phone}
              onChange={handleChange}

            />
          </div>

          <div className='form-group'>
            <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email</label>
            <input id='email' type='email' name='email' placeholder='Enter email' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.email}
              onChange={handleChange}

            />
          </div>

          <div className='form-group'>
            <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password</label>
            <input id='password' type='password' name='password' placeholder='Enter password' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.password}
              onChange={handleChange}

            />
          </div>

          <div className='form-group'>
            <label htmlFor='cpassword' className='text-sm font-medium text-gray-700'>Confirm Password</label>
            <input id='cpassword' type='password' name='cpassword' placeholder='Repeat password' className='input input-bordered h-10' style={{ border: 'none', margin: '5px' }}
              value={inputs.cpassword}
              onChange={handleChange}

            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-primary p-2 uppercase' >Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
