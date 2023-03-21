import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import SocketContext from '../contexts/index';
import store from '../slices';
import { actions } from '../slices/messagesSlice';

const SocketProvider = ({ children }) => {
  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(actions.addMessage(msg));
  });

  const sendMessage = (body, id) => socket.emit('newMessage', { body, channelId: id });

  const value = useMemo(() => ({ sendMessage }), []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
