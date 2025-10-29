import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NotFoundImage from '../../images/not-found.svg';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center">
            <Image className="h-25" src={NotFoundImage} alt={t('titles.notFound')} fluid />
            <h1 className="h4 text-muted">{t('titles.notFound')}</h1>
            <p className="text-muted">
                {t('sentences.canRedirect')}
                <Link to="login">{t('links.toHome')}</Link>
            </p>
        </div>
    );
};
export default NotFound;
