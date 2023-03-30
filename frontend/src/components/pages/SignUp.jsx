import React, { useRef } from 'react';
import {
  Button, Card, Col, Container, FloatingLabel, Form, Image, Row,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageSignUp from './signup.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const inputUsername = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
      password: yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      confirmPassword: yup
        .mixed()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post('/api/v1/signup', { username, password });
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          formik.errors.username = 'Такой пользователь уже существует';
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
                <Image src={ImageSignUp} alt="Регистрация" roundedCircle />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <FloatingLabel controlId="username" className="mb-3" label="Имя пользователя">
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Имя пользователя"
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
                <FloatingLabel controlId="password" className="mb-3" label="Пароль">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
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
                <FloatingLabel controlId="confirmPassword" className="mb-4" label="Подтвердите пароль">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    autocomplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
