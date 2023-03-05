import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>

      <Form.Group>
        <FloatingLabel className="mb-3" label="Ваш ник">
          <Form.Control
            type="text"
            name="username"
            placeholder="Ваш ник"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </FloatingLabel>
      </Form.Group>

      {formik.touched.username && formik.errors.username
        ? <div>{formik.errors.username}</div>
        : null}

      <Form.Group>
        <FloatingLabel className="mb-4" label="Пароль">
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FloatingLabel>
      </Form.Group>

      {formik.touched.password && formik.errors.password
        ? <div>{formik.errors.password}</div>
        : null}

      <Button className="w-100 mb-3" variant="outline-primary" type="submit">Войти</Button>
    </Form>
  );
};

export default Login;
