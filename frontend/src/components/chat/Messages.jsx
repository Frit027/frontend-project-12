import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { selectors as channelSelectors } from '../../slices/channelsSlice';
import SocketContext from '../../contexts';

const Messages = () => {
  const [body, setBody] = useState('');
  const { addNewMessage } = useContext(SocketContext);
  const input = useRef();
  const button = useRef();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) => channelSelectors.selectById(state, currentChannelId));
  const messages = useSelector(
    (state) => Object.values(state.messages.entities).filter((message) => message.channelId === currentChannelId),
  );

  useEffect(() => {
    input.current.focus();
  }, [currentChannelId]);

  const handleChange = (e) => {
    button.current.disabled = !e.target.value;
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewMessage(body, currentChannelId);
    setBody('');
    button.current.disabled = true;
  };

  // TODO: окончания слова
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${currentChannel ? currentChannel.name : ''}`}</b></p>
        <span className="text-muted">{`${messages.length} сообщения`}</span>
      </div>
      <div className="overflow-auto px-5">
        {messages.map((message) => (
          <div className="text-break mb-2">{message.body}</div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              ref={input}
              name="body"
              className="border-0 p-0 ps-2"
              placeholder="Введите сообщение..."
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

export default Messages;
