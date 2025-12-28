import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../modules/api';
import type { Book } from '../lib/types';
import placeholder from '../assets/placeholder.png';

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {

    return (
        <Card className="h-100 shadow-sm" style={{ borderRadius: '0.8rem' }}>
            <div className="d-flex justify-content-center align-items-center p-3" style={{ height: '220px' }}>
                <Card.Img
                    variant="top"
                    src={book.ImageName}
                    alt={book.Title}
                    style={{
                        objectFit: 'contain',
                        maxHeight: '100%',
                        maxWidth: '100%',
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholder;
                    }}
                />
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title
                    as="h5"
                    className="fw-bold mb-2"
                    style={{
                        fontSize: '1.5rem',
                        minHeight: '3em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {book.Title}
                </Card.Title>
                <Card.Text className="text-muted mb-3" style={{ minHeight: '1.5em' }}>
                    {book.Author}
                </Card.Text>

                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">Слов</small>
                        <span className="badge bg-secondary">{book.Words}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">Уникальных</small>
                        <span className="badge bg-danger">{book.UniqueWords}</span>
                    </div>

                    <div className="d-grid gap-2">
                        <Link
                            to={`/books/${book.id}`}
                            className="btn btn-outline-primary"
                            style={{
                                backgroundColor: '#9ee7f0',
                                borderColor: '#9ee7f0',
                                color: '#000',
                                fontWeight: 600,
                            }}
                        >
                            Подробнее
                        </Link>
                        
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}