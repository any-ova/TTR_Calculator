import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getBookById } from '../modules/api';
import { useEffect, useState } from 'react';

export function Breadcrumbs() {
    const location = useLocation();
    const { id } = useParams();
    const [bookTitle, setBookTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const pathnames = location.pathname.split('/').filter(x => x);

    useEffect(() => {
        if (pathnames[0] === 'books' && pathnames[1] && !isNaN(Number(pathnames[1]))) {
            setLoading(true);
            getBookById(Number(pathnames[1]))
                .then(book => setBookTitle(`${book.Title} (${book.Author})`))
                .catch(() => setBookTitle(`Книга ${pathnames[1]}`))
                .finally(() => setLoading(false));
        }
    }, [location.pathname]);

    const capitalize = (s: string) => {
        if (s === 'books') return 'Книги';
        if (s === 'order') return 'Заявка';
        return s;
    };

    return (
        <nav aria-label="Хлебные крошки" className="breadcrumb" style={{ padding: '0.5rem 0', margin: '0 0 1.5rem' }}>
            <Link to="/" className="breadcrumb-item" style={{ textDecoration: 'none', color: '#000' }}>
                Главная
            </Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                if (index === 0 && value === 'books') {
                    return isLast ? (
                        <span key={to} className="breadcrumb-item active" aria-current="page">
                            Книги
                        </span>
                    ) : (
                        <Link key={to} to={to} className="breadcrumb-item">
                            Книги
                        </Link>
                    );
                }

                if (index === 1 && pathnames[0] === 'books' && !isNaN(Number(value))) {
                    return (
                        <span key={to} className="breadcrumb-item active" aria-current="page">
                            {loading ? 'Загрузка...' : bookTitle || `Книга ${value}`}
                        </span>
                    );
                }

                if (index === 0 && value === 'order') {
                    return isLast ? (
                        <span key={to} className="breadcrumb-item active" aria-current="page">
                            Заявка
                        </span>
                    ) : (
                        <Link key={to} to={to} className="breadcrumb-item">
                            Заявка
                        </Link>
                    );
                }

                return isLast ? (
                    <span key={to} className="breadcrumb-item active" aria-current="page">
                        {capitalize(value)}
                    </span>
                ) : (
                    <Link key={to} to={to} className="breadcrumb-item">
                        {capitalize(value)}
                    </Link>
                );
            })}
        </nav>
    );
}