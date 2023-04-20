import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SocketContext from '../../contexts';

const RemoveChannel = ({ modalInfo, hideModal }) => {
  const { t } = useTranslation();
  const { removeChannel } = useContext(SocketContext);

  const handleRemove = () => {
    removeChannel(modalInfo.channel.id);
    hideModal();
    toast.success(t('titles.channelRemoved'));
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('questions.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={hideModal}>{t('actions.cancel')}</Button>
          <Button variant="danger" onClick={handleRemove}>{t('actions.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

RemoveChannel.propTypes = {
  modalInfo: PropTypes.shape,
  hideModal: PropTypes.func.isRequired,
};

RemoveChannel.defaultProps = {
  modalInfo: { type: null, channel: null },
};

export default RemoveChannel;
