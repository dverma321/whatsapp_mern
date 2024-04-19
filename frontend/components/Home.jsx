import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]); // State for users

  // State for search input value
  const [searchValue, setSearchValue] = useState('');

 

  return (
    <div className='container'>
      Welcome to Home
    </div>
  );
};

export default Home;
