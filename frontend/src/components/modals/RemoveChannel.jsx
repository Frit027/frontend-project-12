import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../providers/SocketProvider';
import { actions } from '../../slices/modalsSlice';

const RemoveChannel = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { removeChannel } = useContext(SocketContext);
    const channel = useSelector((state) => state.modals.channel);

    const hideModal = () => dispatch(actions.hideModal());

    const handleRemove = () => {
        removeChannel(channel.id);
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

export default RemoveChannel;
