import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SocketContext } from '../providers/SocketProvider';
import ChannelNameForm from '../forms/ChannelNameForm';

const RenameChannel = ({ modalInfo, hideModal }) => {
  const { t } = useTranslation();
  const { renameChannel } = useContext(SocketContext);

  const handleSubmit = (name) => {
    renameChannel(modalInfo.channel.id, name);
    toast.success(t('titles.channelRenamed'));
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChannelNameForm
          currentName={modalInfo.channel.name}
          handleSubmit={handleSubmit}
          hideModal={hideModal}
        />
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
