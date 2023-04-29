import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import Header from './elements/Header';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
