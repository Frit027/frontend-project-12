import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
      <Container>
        <Navbar.Brand href="/">{t('links.home')}</Navbar.Brand>
        {token ? <Button type="button" variant="primary" onClick={logout}>{t('actions.logout')}</Button> : null}
      </Container>
    </Navbar>
  );
};

export default Header;
