import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const logIn = (data) => {
    localStorage.setItem('userData', JSON.stringify({ token: data.token, username: data.username }));
  };

  const logOut = () => {
    localStorage.removeItem('userData');
  };

  const isLoggedIn = () => !!localStorage.getItem('userData');

  const getToken = () => JSON.parse(localStorage.getItem('userData')).token;

  const getUsername = () => JSON.parse(localStorage.getItem('userData')).username;

  const value = useMemo(() => ({
    logIn, logOut, isLoggedIn, getToken, getUsername,
  }), [logIn, logOut, isLoggedIn, getToken, getUsername]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
