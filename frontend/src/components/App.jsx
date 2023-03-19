import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const socket = io();

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
