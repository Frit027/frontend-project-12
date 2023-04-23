import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { selectors } from '../../slices/channelsSlice';

const ChannelNameForm = ({ currentName, handleSubmit, hideModal }) => {
  const input = useRef();
  const { t } = useTranslation();
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
      name: filter.clean(currentName),
    },
    validationSchema: yup.object({
      name: yup.string()
        .min(3, t('renameChannelForm.errors.length'))
        .max(20, t('renameChannelForm.errors.length'))
        .notOneOf(channelNames, t('renameChannelForm.errors.unique'))
        .required(t('renameChannelForm.errors.required')),
    }),
    onSubmit: ({ name }) => {
      handleSubmit(name);
      hideModal();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mb-2"
          id="name"
          name="name"
          ref={input}
          onChange={formik.handleChange}
          value={formik.touched.name && formik.errors.name ? filter.clean(formik.values.name) : formik.values.name}
          autocomplete="off"
          isInvalid={formik.touched.name && formik.errors.name}
        />
        <Form.Label class="visually-hidden">{t('labels.channelName')}</Form.Label>
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button className="me-2" variant="secondary" onClick={hideModal}>{t('actions.cancel')}</Button>
        <Button variant="primary" type="submit">{t('actions.send')}</Button>
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
