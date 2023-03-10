import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../AuthContext';

const Home = () => {
  const { loggedIn } = useContext(UserContext);

  return (
    loggedIn ? <h1>Home</h1> : <Navigate to="/login" />
  );
};

export default Home;
