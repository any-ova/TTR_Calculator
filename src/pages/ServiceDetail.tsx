import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchServiceById } from '../services/api';
import { useAsync } from '../hooks/useFetch';
import { Row, Col, Image } from 'react-bootstrap';

const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: svc, loading } = useAsync(() => fetchServiceById(id || ''), [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!svc) return <div>Не найдено</div>;

    return (
        <Row>
            <Col md={4}>
                <Image src={svc.image || '/img/default-service.png'} fluid />
            </Col>
            <Col md={8}>
                <h2>{svc.title}</h2>
                <p><strong>Автор:</strong> {svc.author}</p>
                <p><strong>Цена:</strong> {svc.price ? `${svc.price} ₽` : '—'}</p>
                <p>{svc.description}</p>
                <p><strong>Всего слов:</strong> {svc.words}</p>
                <p><strong>Уникальных слов:</strong> {svc.uniqueWords}</p>
            </Col>
        </Row>
    );
};

export default ServiceDetail;