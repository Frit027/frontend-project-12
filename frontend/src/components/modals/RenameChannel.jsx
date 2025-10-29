import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../providers/SocketProvider';
import ChannelNameForm from '../forms/ChannelNameForm';
import { actions } from '../../slices/modalsSlice';

const RenameChannel = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { renameChannel } = useContext(SocketContext);
    const channel = useSelector((state) => state.modals.channel);

    const handleSubmit = (name) => {
        renameChannel(channel.id, name);
        toast.success(t('titles.channelRenamed'));
    };

    return (
        <Modal show centered onHide={() => dispatch(actions.hideModal())}>
            <Modal.Header closeButton>
                <Modal.Title>{t('titles.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ChannelNameForm
                    currentName={channel.name}
                    handleSubmit={handleSubmit}
                />
            </Modal.Body>
        </Modal>
    );
};

export default RenameChannel;
