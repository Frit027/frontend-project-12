import React, { useContext, useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SocketContext from '../../contexts';
import { selectors } from '../../slices/channelsSlice';

const AddChannel = ({ hideModal }) => {
  const input = useRef();
  const { addNewChannel } = useContext(SocketContext);
  const channelNames = useSelector(selectors.selectAll).map((channel) => channel.name);

  useEffect(() => {
    input.current.focus();
  }, []);

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
      addNewChannel(name);
      hideModal();
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
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
            <Button className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

AddChannel.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default AddChannel;
