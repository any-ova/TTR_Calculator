import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { fetchBooks } from '../services/api';
import ServiceCard from '../components/ServiceCard';

const Services: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [from, setFrom] = useState(''); // YYYY-MM-DD
    const [to, setTo] = useState('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [handle, setHandle] = useState('');
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const res = await fetchBooks(params as any);
            setItems(res);
        } finally {
            setLoading(false);
        }
    }, []);

    // initial load (mock or backend)
    useEffect(() => {
        load();
    }, [load]);

    const apply = (e?: React.FormEvent) => {
        e?.preventDefault();
        const params: Record<string, string | number | undefined> = {
            title: title || undefined,
            author: author || undefined,
            from: from || undefined,
            to: to || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            handle: handle || undefined,
        };
        load(params);
    };

    const reset = () => {
        setTitle('');
        setAuthor('');
        setFrom('');
        setTo('');
        setMinPrice('');
        setMaxPrice('');
        setHandle('');
        load();
    };

    return (
        <>
            <h1 className="page-title">Книги / Услуги</h1>

            <Form onSubmit={apply} className="mb-3">
                <Row className="g-2 align-items-center">
                    <Col md={3}>
                        <Form.Control placeholder="Название или часть названия" value={title} onChange={e => setTitle(e.target.value)} />
                    </Col>
                    <Col md={2}>
                        <Form.Control placeholder="Автор" value={author} onChange={e => setAuthor(e.target.value)} />
                    </Col>

                    <Col md={1}>
                        <Button type="submit">Применить</Button>
                    </Col>
                    <Col md={1}>
                        <Button variant="outline-secondary" onClick={reset}>Сброс</Button>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <small className="text-muted">
                            Фильтрация выполняется на бэкенде: параметры отправляются в query. Если бэкенд недоступен — используем mock.
                        </small>
                    </Col>
                </Row>
            </Form>

            {loading && <div>Загрузка...</div>}

            <div className="books-container">
                {items && items.length > 0 ? items.map((it: any) => (
                    <div key={it.ID ?? it.id} style={{ width: '100%' }}>
                        <ServiceCard service={it} />
                    </div>
                )) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0', color: '#777' }}>
                        Результатов нет
                    </div>
                )}
            </div>
        </>
    );
};

export default Services;