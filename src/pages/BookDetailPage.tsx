import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../modules/api';
import type { Book } from '../lib/types';
import { resolveImageUrl } from '../modules/api';
import placeholder from '../assets/placeholder.png';

export function BookDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getBookById(Number(id))
            .then(setBook)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="container-wrapper" style={{ paddingTop: '2rem' }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="container-wrapper" style={{ paddingTop: '2rem' }}>
                <div style={{ textAlign: 'center', padding: '2rem', color: '#777' }}>Книга не найдена</div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={() => navigate(-1)} className="btn btn-secondary">
                        ← Назад
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-wrapper" style={{ paddingTop: '2rem' }}>
            <div className="book-detail-card" style={{ textAlign: 'center' }}>
                <div className="book-detail-image">
                    <img
                        src={book.ImageName}
                     alt={book.Title}
                     onError={(e) => {
                         (e.target as HTMLImageElement).src = placeholder;
                     }}
                     style={{
                         width: '100%',
                         maxWidth: '280px',
                         height: 'auto',
                         display: 'block',
                         margin: '0 auto',
                         borderRadius: '0.6rem',
                         boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                     }}
                />
            </div>
            <div className="book-detail-content">
                    <h1 className="book-detail-title">{book.Title}</h1>
                    <p className="book-detail-author">Автор: <strong>{book.Author}</strong></p>
                    <div className="book-detail-stats">
                        <div className="stat-item">
                            <span className="stat-label">Количество слов:</span>
                            <span className="stat-value">{book.Words.toLocaleString()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Уникальных слов:</span>
                            <span className="stat-value">{book.UniqueWords.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="book-detail-description">
                        <h3>Описание</h3>
                        <p>{book.Description || 'Описание отсутствует.'}</p>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary"
                    style={{ fontSize: '1.3rem', padding: '0.6rem 1.8rem' }}
                >
                    ← Назад
                </button>
            </div>
        </div>
    );
}