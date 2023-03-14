import React from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { selectors } from '../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectors.selectAll);
  console.log(messages);
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>#</b></p>
        <span className="text-muted">3 сообщения</span>
      </div>
      <div className="overflow-auto px-5">
        {messages.map((message) => (
          <div className="text-break mb-2">{message}</div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form className="py-1 border rounded-2">
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
            />
            <button className="btn btn-group-vertical" type="submit">
              Иконка
            </button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default Messages;
