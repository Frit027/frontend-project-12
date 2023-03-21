import React, { useMemo } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import SocketContext from '../contexts/index';
import store from '../slices';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const SocketProvider = ({ children }) => {
  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(messagesActions.addMessage(msg));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });

  const sendMessage = (body, id) => socket.emit('newMessage', { body, channelId: id });

  const addChannel = (name) => socket.emit('newChannel', { name }, ({ data }) => {
    store.dispatch(channelsActions.setCurrentChannelId(data.id));
  });

  const value = useMemo(() => ({ sendMessage, addChannel }), []);

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
