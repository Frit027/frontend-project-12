import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import SocketContext from '../contexts';
import { selectors } from '../slices/channelsSlice';

const AddChannel = () => {
  const [isShow, setIsShow] = useState(false);
  const input = useRef();
  const { addChannel } = useContext(SocketContext);
  const channelNames = useSelector(selectors.selectAll).map((channel) => channel.name);

  const handleShow = () => setIsShow(true);

  const handleClose = () => setIsShow(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channelNames, 'Должно быть уникальным')
        .required('Обязательное поле'),
    }),
    onSubmit: ({ name }) => {
      addChannel(name);
      handleClose();
    },
  });

  useEffect(() => {
    if (isShow) {
      formik.resetForm();
      input.current.focus();
    }
  }, [isShow]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={handleShow}>
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

      <Modal show={isShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label class="visually-hidden">Имя канала</Form.Label>
              <Form.Control
                className="mb-2"
                id="name"
                name="name"
                ref={input}
                onChange={formik.handleChange}
                value={formik.values.body}
                autocomplete="off"
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button className="mr-2" variant="secondary" onClick={handleClose}>Отменить</Button>
              <Button variant="primary" type="submit">Отправить</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
