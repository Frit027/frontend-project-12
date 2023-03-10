import React from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => (localStorage.getItem('token') ? <h1>Home</h1> : <Navigate to="/login" />);

export default Home;
