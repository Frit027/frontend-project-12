import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { selectors, actions as channelsActions } from '../slices/channelsSlice';
import AddChannel from './AddChannel';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

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
        <Dropdown.Item>Удалить</Dropdown.Item>
        <Dropdown.Item>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <AddChannel />

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100">
            {channel.removable ? renderDropdownButton(channel) : renderButton(channel)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
