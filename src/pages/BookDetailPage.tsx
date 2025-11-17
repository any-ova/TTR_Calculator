import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook, TemplateBook } from '../services/api';

const BookDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<TemplateBook | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchBook(id).then((b) => setBook(b)).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ padding: 20 }}>Загрузка...</div>;
    if (!book) return <div style={{ padding: 20 }}>Книга не найдена</div>;

    return (
        <div className="book-detail" style={{ marginTop: 20 }}>
            <img src={book.ImageURL || '/img/default-service.png'} alt={book.Title} />
            <div className="book-info">
                <div className="left-content">
                    <p className="label-book-det">Название:</p>
                    <p className="label-book-det">Автор:</p>
                    <p className="label-book-det">Количество уникальных слов:</p>
                    <p className="label-book-det">Количество всего слов:</p>
                    <p className="label-book-det">Описание:</p>
                </div>
                <div className="right-content">
                    <p className="label-book-det-black">{book.Title}</p>
                    <p className="label-book-det-black">{book.Author}</p>
                    <p className="label-book-det-black">{book.UniqueWords}</p>
                    <p className="label-book-det-black">{book.Words}</p>
                    <p className="label-book-det-black">{book.Description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;