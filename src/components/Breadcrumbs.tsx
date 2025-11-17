import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { fetchBook } from '../services/api';
const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const [bookTitle, setBookTitle] = useState<string | null>(null);
    const [bookAuthor, setBookAuthor] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const parts = location.pathname.split('/').filter(Boolean);

    // Проверяем, является ли текущий путь страницей книги
    const isBookPage = parts.length >= 2 && parts[0] === 'books' && parts[1] && !isNaN(Number(parts[1]));

    useEffect(() => {
        if (isBookPage) {
            const bookId = parts[1];
            setLoading(true);
            fetchBook(bookId)
                .then(book => {
                    if (book) {
                        setBookTitle(book.Title);
                        setBookAuthor(book.Author || '');
                    } else {
                        setBookTitle(`Книга ${bookId}`);
                        setBookAuthor('');
                    }
                })
                .catch(err => {
                    console.error('Error fetching book for breadcrumbs:', err);
                    setBookTitle(`Книга ${bookId}`);
                    setBookAuthor('');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [location.pathname]);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Главная</Breadcrumb.Item>

            {parts.map((p, i) => {
                const url = '/' + parts.slice(0, i + 1).join('/');
                const isLast = i === parts.length - 1;
                if (isBookPage && i === 1) {
                    if (loading) {
                        return (
                            <Breadcrumb.Item key={url} active={isLast}>
                                Загрузка...
                            </Breadcrumb.Item>
                        );
                    }

                    const title = bookTitle || `Книга ${p}`;
                    const author = bookAuthor ? ` (${bookAuthor})` : '';

                    return (
                        <Breadcrumb.Item key={url} active={isLast}>
                            {title}{author}
                        </Breadcrumb.Item>
                    );
                }

                const title = decodeURIComponent(p);

                if (i === 0 && p === 'books') {
                    return (
                        <Breadcrumb.Item key={url} linkAs={Link} linkProps={{ to: url }} active={isLast}>
                            Книги
                        </Breadcrumb.Item>
                    );
                }

                return (
                    <Breadcrumb.Item key={url} linkAs={Link} linkProps={{ to: url }} active={isLast}>
                        {title}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;