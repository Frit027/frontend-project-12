import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { selectors, actions as channelsActions } from '../../slices/channelsSlice';
import getModal from '../modals';

const Channels = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const hideModal = () => setModalInfo({ type: null, channel: null });

  const showModal = (type, channel = null) => setModalInfo({ type, channel });

  const renderButton = (channel) => (
    <Button
      className="w-100 rounded-0 text-start text-truncate"
      variant={channel.id === currentChannelId ? 'secondary' : ''}
      onClick={() => dispatch(channelsActions.setCurrentChannelId(channel.id))}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );

  const renderDropdownButton = (channel) => (
    <Dropdown className="d-flex" as={ButtonGroup}>
      {renderButton(channel)}
      <Dropdown.Toggle className="flex-grow-0" split variant={channel.id === currentChannelId ? 'secondary' : ''} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('removing', channel)}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderModal = () => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return <Component modalInfo={modalInfo} hideModal={hideModal} />;
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => showModal('adding')}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2
                2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100">
            {channel.removable ? renderDropdownButton(channel) : renderButton(channel)}
          </li>
        ))}
      </ul>

      {renderModal()}
    </>
  );
};

export default Channels;
