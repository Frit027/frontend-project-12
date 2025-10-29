import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {
    const { isLoggedIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClick = () => {
        logOut();
        navigate('/login');
    };

    return (
        <Navbar className="shadow-sm" expand="lg" variant="light" bg="white">
            <Container>
                <Navbar.Brand href="/">{t('links.home')}</Navbar.Brand>
                {isLoggedIn()
                    ? <Button type="button" variant="primary" onClick={handleClick}>{t('actions.logout')}</Button>
                    : null}
            </Container>
        </Navbar>
    );
};

export default Header;
