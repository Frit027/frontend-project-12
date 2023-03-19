import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Socket } from 'socket.io-client';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import Channels from '../Channels';
import Messages from '../Messages';

const Home = ({ socket }) => {
  const [currentChannelId, setCurrentChannelId] = useState(null);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      dispatch(channelsActions.addChannels(data.channels));
      dispatch(messagesActions.addMessages(data.messages));
      setCurrentChannelId(data.currentChannelId);
    };

    if (token) {
      fetchData();
    }
  }, []);

  return (
    token
      ? (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <Channels
                currentChannelId={currentChannelId}
                setCurrentChannelId={setCurrentChannelId}
              />
            </Col>
            <Col className="col p-0 h-100">
              <Messages currentChannelId={currentChannelId} socket={socket} />
            </Col>
          </Row>
        </Container>
      )
      : <Navigate to="/login" />
  );
};

Home.propTypes = {
  socket: PropTypes.instanceOf(Socket).isRequired,
};

export default Home;
