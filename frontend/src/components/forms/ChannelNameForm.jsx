import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectors } from '../../slices/channelsSlice';

const ChannelNameForm = ({ currentName, handleSubmit, hideModal }) => {
  const input = useRef();
  const channelNames = useSelector(selectors.selectAll).map((channel) => channel.name);

  useEffect(() => {
    if (currentName) {
      input.current.select();
    } else {
      input.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentName,
    },
    validationSchema: yup.object({
      name: yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(channelNames, 'Должно быть уникальным')
        .required('Обязательное поле'),
    }),
    onSubmit: ({ name }) => {
      handleSubmit(name);
      hideModal();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label class="visually-hidden">Имя канала</Form.Label>
        <Form.Control
          className="mb-2"
          id="name"
          name="name"
          ref={input}
          onChange={formik.handleChange}
          value={formik.values.name}
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
  );
};

ChannelNameForm.propTypes = {
  currentName: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

ChannelNameForm.defaultProps = {
  currentName: '',
};

export default ChannelNameForm;
