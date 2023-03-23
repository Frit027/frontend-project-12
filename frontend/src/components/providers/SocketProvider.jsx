import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import SocketContext from '../../contexts';
import store from '../../slices';
import { actions as messagesActions } from '../../slices/messagesSlice';
import { actions as channelsActions } from '../../slices/channelsSlice';

const SocketProvider = ({ children }) => {
  const socket = io();

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      store.dispatch(messagesActions.addMessage(msg));
    });

    socket.on('newChannel', (channel) => {
      store.dispatch(channelsActions.addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(channelsActions.removeChannel(id));
      store.dispatch(channelsActions.setCurrentChannelId(1));
    });
  }, []);

  const addNewMessage = (body, id) => socket.emit('newMessage', { body, channelId: id });

  const addNewChannel = (name) => socket.emit('newChannel', { name }, ({ data }) => {
    store.dispatch(channelsActions.setCurrentChannelId(data.id));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id });

  const value = useMemo(() => ({ addNewMessage, addNewChannel, removeChannel }), []);

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