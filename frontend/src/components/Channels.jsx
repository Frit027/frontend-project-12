import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { selectors, actions as channelsActions } from '../slices/channelsSlice';
import AddChannel from './AddChannel';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <>
      <AddChannel />

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li className="nav-item w-100">
            <Button
              className="w-100 rounded-0 text-start"
              variant={channel.id === currentChannelId ? 'secondary' : ''}
              onClick={() => dispatch(channelsActions.setCurrentChannelId(channel.id))}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Channels;
