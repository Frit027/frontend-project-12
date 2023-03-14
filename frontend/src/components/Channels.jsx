import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { selectors } from '../slices/channelsSlice';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  console.log(channels);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (channels.length) {
      setActive(channels[0].id);
    }
  }, [channels.length]);

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li className="nav-item w-100">
          <Button
            className="w-100 rounded-0 text-start"
            variant={channel.id === active ? 'secondary' : ''}
            onClick={() => setActive(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Channels;
