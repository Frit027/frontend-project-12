import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand href="/">{t('links.home')}</Navbar.Brand>
        {token ? <Button type="button" variant="primary" onClick={logOut}>{t('actions.logout')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
