import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SocketContext from '../../contexts';
import ChannelNameForm from '../forms/ChannelNameForm';

const RenameChannel = ({ modalInfo, hideModal }) => {
  const { renameChannel } = useContext(SocketContext);

  const handleSubmit = (name) => {
    renameChannel(modalInfo.channel.id, name);
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChannelNameForm currentName={modalInfo.channel.name} handleSubmit={handleSubmit} hideModal={hideModal} />
      </Modal.Body>
    </Modal>
  );
};

RenameChannel.propTypes = {
  modalInfo: PropTypes.shape,
  hideModal: PropTypes.func.isRequired,
};

RenameChannel.defaultProps = {
  modalInfo: { type: null, channel: null },
};

export default RenameChannel;
