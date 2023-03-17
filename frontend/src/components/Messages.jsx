import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { selectors as messageSelectors } from '../slices/messagesSlice';
import { selectors as channelSelectors } from '../slices/channelsSlice';

const Messages = (props) => {
  const { currentChannelId } = props;
  const [body, setBody] = useState('');
  const button = useRef();
  const messages = useSelector(messageSelectors.selectAll);
  const currentChannel = useSelector((state) => channelSelectors.selectById(state, currentChannelId));

  const handleChange = (e) => {
    button.current.disabled = !e.target.value;
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBody('');
    button.current.disabled = true;
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${currentChannel ? currentChannel.name : ''}`}</b></p>
        <span className="text-muted">3 сообщения</span>
      </div>
      <div className="overflow-auto px-5">
        {messages.map((message) => (
          <div className="text-break mb-2">{message}</div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              name="body"
              className="border-0 p-0 ps-2"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              onChange={handleChange}
              value={body}
              autocomplete="off"
            />
            <button className="btn btn-group-vertical border-0" type="submit" ref={button} disabled>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2
                    2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0
                    0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
            </button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

Messages.propTypes = {
  currentChannelId: PropTypes.number.isRequired,
};

export default Messages;
