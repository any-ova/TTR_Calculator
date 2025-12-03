import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
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

            {/* ✅ АДАПТИВНАЯ ФОРМА ПОИСКА — БЕЗ КАСТОМНОГО CSS */}
            <Form onSubmit={handleSearch} className="mb-4">
                <Row className="g-2">
                    {/* Поле "Название" */}
                    <Col xs={12} sm={6} md={5} lg={4}>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            value={title}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                            size="sm"
                        />
                    </Col>

                    {/* Поле "Автор" */}
                    <Col xs={12} sm={6} md={5} lg={4}>
                        <Form.Control
                            type="text"
                            placeholder="Автор"
                            value={author}
                            onChange={(e) => dispatch(setAuthor(e.target.value))}
                            size="sm"
                        />
                    </Col>

                    {/* Кнопка "Найти" */}
                    <Col xs={12} sm="auto">
                        <Button type="submit" variant="primary" size="sm" className="w-100">
                            Найти
                        </Button>
                    </Col>
                </Row>

                {/* Кнопка "Очистить" — показываем только если есть фильтр */}
                {(title || author) && (
                    <div className="text-center mt-2">
                        <Button
                            type="button"
                            variant="outline-secondary"
                            size="sm"
                            onClick={handleClear}
                        >
                            Очистить
                        </Button>
                    </div>
                )}
            </Form>

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