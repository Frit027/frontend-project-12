import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logOut = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand href="/">{t('links.home')}</Navbar.Brand>
        {userData
          ? <Button type="button" variant="primary" onClick={logOut}>{t('actions.logout')}</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default Header;
