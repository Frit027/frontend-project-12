import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, FloatingLabel, Form, Button, Card, Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import ImageLogin from './login.jpg';

const Login = () => {
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const navigate = useNavigate();
  const inputUsername = useRef();

  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsAuthFailed(false);
      try {
        const { data } = await axios.post('/api/v1/login', values);
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setIsAuthFailed(true);
          inputUsername.current.select();
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
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={ImageLogin} alt="Войти" roundedCircle />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group>
                  <FloatingLabel controlId="username" className="mb-3" label="Ваш ник">
                    <Form.Control
                      required
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Ваш ник"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={isAuthFailed}
                      ref={inputUsername}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel controlId="password" className="mb-4" label="Пароль">
                    <Form.Control
                      required
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={isAuthFailed}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
