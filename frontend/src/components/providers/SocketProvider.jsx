import React, { useMemo } from 'react';
import { Socket } from 'socket.io-client';
import PropTypes from 'prop-types';
import SocketContext from '../../contexts';
import store from '../../slices';
import { actions as channelsActions } from '../../slices/channelsSlice';

const SocketProvider = ({ children, socket }) => {
  const addNewMessage = (body, id, resolve) => socket.emit('newMessage', { body, channelId: id }, (response) => {
    if (response.status === 'ok') {
      resolve();
    }
  });

  const addNewChannel = (name) => socket.emit('newChannel', { name }, ({ data }) => {
    store.dispatch(channelsActions.setCurrentChannelId(data.id));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id });

  const renameChannel = (id, name) => socket.emit('renameChannel', { id, name });

  const value = useMemo(() => ({
    addNewMessage, addNewChannel, removeChannel, renameChannel,
  }), []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.instanceOf(Socket).isRequired,
};

export default SocketProvider;
