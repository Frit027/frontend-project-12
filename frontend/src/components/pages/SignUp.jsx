import React, { useRef } from 'react';
import {
  Button, Card, Col, Container, FloatingLabel, Form, Image, Row,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SignUpImage from '../../images/signup.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const inputUsername = useRef();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, t('signUpForm.errors.usernameLength'))
        .max(20, t('signUpForm.errors.usernameLength'))
        .required(t('signUpForm.errors.required')),
      password: yup.string()
        .min(6, t('signUpForm.errors.passwordLength'))
        .required(t('signUpForm.errors.required')),
      confirmPassword: yup
        .mixed()
        .oneOf([yup.ref('password'), null], t('signUpForm.errors.mustMatch'))
        .required(t('signUpForm.errors.required')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post('/api/v1/signup', { username, password });
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          formik.errors.username = t('signUpForm.errors.uniqueUser');
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src={SignUpImage} alt={t('titles.registration')} roundedCircle />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('titles.registration')}</h1>
                <FloatingLabel controlId="username" className="mb-3" label={t('labels.username')}>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    placeholder={t('placeholders.username')}
                    autocomplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.username && formik.errors.username}
                    ref={inputUsername}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="password" className="mb-3" label={t('labels.password')}>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t('placeholders.password')}
                    autocomplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.password && formik.errors.password}
                    ref={inputUsername}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="confirmPassword" className="mb-4" label={t('labels.confirmPassword')}>
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={t('placeholders.confirmPassword')}
                    autocomplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">{t('actions.signUp')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
