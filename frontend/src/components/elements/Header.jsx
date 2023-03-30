import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';

const Header = () => {
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {token ? <Button type="button" variant="primary" onClick={logout}>Выйти</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
