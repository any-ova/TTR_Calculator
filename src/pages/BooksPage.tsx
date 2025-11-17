import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';

const Books: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const res = await fetchBooks(params as any);
            setItems(res || []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const apply = (e?: React.FormEvent) => {
        e?.preventDefault();
        const params: Record<string, string | number | undefined> = {
            title: title || undefined,
            author: author || undefined,
        };
        load(params);
    };

    const reset = () => {
        setTitle('');
        setAuthor('');
        load();
    };

    return (
        <>
            <h1 className="page-title">Книги / Услуги</h1>

            <Form onSubmit={apply} className="mb-3">
                <Row className="g-2 align-items-center">
                    <Col md={3}>
                        <Form.Control
                            placeholder="Название"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            placeholder="Автор"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        {}
                        <Button
                            type="submit"
                            className="me-2"
                        >
                            Применить
                        </Button>

                        {}
                        <Button
                            variant="outline-secondary"
                            onClick={reset}
                            className="ms-2"
                            style={{
                                fontSize: '1.3rem',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '0.6rem'
                            }}
                        >
                            Сброс
                        </Button>
                    </Col>
                </Row>
            </Form>

            {loading && <div>Загрузка...</div>}

            <div className="books-container">
                {items.length ? items.map((it: any) => (
                    <BookCard key={it.ID ?? it.id} service={it} />
                )) : (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '2rem 0',
                        color: '#777'
                    }}>
                        Результатов нет
                    </div>
                )}
            </div>
        </>
    );
};

export default Books;