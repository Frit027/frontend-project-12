import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SocketContext from '../../contexts';
import ChannelNameForm from '../forms/ChannelNameForm';

const AddChannel = ({ hideModal }) => {
  const { t } = useTranslation();
  const { addNewChannel } = useContext(SocketContext);

  const handleSubmit = (name) => {
    addNewChannel(name);
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChannelNameForm handleSubmit={handleSubmit} hideModal={hideModal} />
      </Modal.Body>
    </Modal>
  );
};

AddChannel.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default AddChannel;
