import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SocketContext from '../../contexts';

const RemoveChannel = ({ modalInfo, hideModal }) => {
  const { removeChannel } = useContext(SocketContext);

  const handleRemove = () => {
    removeChannel(modalInfo.channel.id);
    hideModal();
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
          <Button variant="danger" onClick={handleRemove}>Удалить</Button>
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
