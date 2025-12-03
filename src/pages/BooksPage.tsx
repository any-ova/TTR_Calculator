import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BookCard } from '../components/BookCard';
import { getBooks } from '../modules/api';
import type { Book } from '../lib/types';
import { setTitle, setAuthor, clearFilters } from '../features/filter/filterSlice';
import type { RootState } from '../store';

export function BooksPage() {
    const dispatch = useDispatch();
    const { title, author } = useSelector((state: RootState) => state.filter);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const loadBooks = async (t = '', a = '') => {
        setLoading(true);
        try {
            const data = await getBooks(t, a);
            setBooks(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks(title, author);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        loadBooks(title, author);
    };

    const handleClear = () => {
        dispatch(clearFilters());
        loadBooks();
    };

    return (
        <Container fluid="xxl" className="py-4">
            <h1 className="page-title">Книги</h1>

            {/* Поиск — без лупы, с кнопками "Найти" и "Очистить" */}
            <form onSubmit={handleSearch} className="search-form mb-4">
                <div className="search-container-wrapper">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Название"
                            value={title}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                        />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Автор"
                            value={author}
                            onChange={(e) => dispatch(setAuthor(e.target.value))}
                        />
                        <button type="submit" className="search-button">
                            Найти
                        </button>
                    </div>
                </div>

                {(title || author) && (
                    <div className="text-center mt-2">
                        <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={handleClear}
                            className="clear-filters-btn"
                        >
                            Очистить
                        </Button>
                    </div>
                )}
            </form>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : books.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {books.map((book) => (
                        <Col key={book.id}>
                            <BookCard book={book} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="text-center py-5 text-muted">
                    Книг не найдено
                </div>
            )}
        </Container>
    );
}