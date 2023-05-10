import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../providers/SocketProvider';
import { actions } from '../../slices/modalsSlice';
import ChannelNameForm from '../forms/ChannelNameForm';

const AddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addNewChannel } = useContext(SocketContext);

  const handleSubmit = (name) => {
    addNewChannel(name);
    toast.success(t('titles.channelAdded'));
  };

  return (
    <Modal show centered onHide={() => dispatch(actions.hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChannelNameForm handleSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
