// src/components/ServiceCard.tsx
import React from 'react';
import { TemplateBook } from '../services/api';

const DEFAULT = '/img/default-service.png';

const ServiceCard: React.FC<{ service: any }> = ({ service }) => {
    // service может быть TemplateBook или "raw" от бэка; приводим к полям, которые есть
    const title = service.Title ?? service.title ?? service.name ?? 'Без названия';
    const author = service.Author ?? service.author ?? '';
    const image = service.ImageURL ?? service.image_url ?? service.image_name ? (service.ImageURL ?? DEFAULT) : (service.image || DEFAULT);
    const unique = service.UniqueWords ?? service.unique_words ?? service.UniqueWords ?? 0;
    const words = service.Words ?? service.words ?? 0;

    return (
        <div className="book">
            <a href={`/book/${service.ID ?? service.id}`} className="book-link">
                <div className="card-content">
                    <img src={image || DEFAULT} alt={title} />
                    <p className="card-label">{title}</p>
                    <p className="card-label-au">{author}</p>
                    <p className="card-label">Количество уникальных слов</p>
                    <p className="uniq-num-label">{unique}</p>
                    <p className="card-label">Количество слов</p>
                    <p className="uniq-num-label">{words}</p>
                </div>
            </a>

            <form action="/add-to-cart" method="POST" style={{ marginTop: 10, textAlign: 'center' }} onSubmit={(e) => { /* optional: allow server form submit */ }}>
                <input type="hidden" name="book_id" value={service.ID ?? service.id} />
                <input type="hidden" name="comment" value="Добавлено в заявку" />
                <button type="submit" className="add-to-cart-btn">Добавить в заявку</button>
            </form>

            <form action="/delete-book" method="POST" style={{ marginTop: 5, textAlign: 'center' }}>
                <input type="hidden" name="book_id" value={service.ID ?? service.id} />
                <button type="submit" className="delete-btn">Удалить</button>
            </form>
        </div>
    );
};

export default ServiceCard;