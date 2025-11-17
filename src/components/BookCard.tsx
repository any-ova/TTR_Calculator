import React from 'react';
import { Link } from 'react-router-dom';
import getImageUrl from '../services/image';

const DEFAULT = '/img/default-service.png';

const BookCard: React.FC<{ service: any }> = ({ service }) => {
    const title = service.Title ?? service.title ?? 'Без названия';
    const author = service.Author ?? service.author ?? '';
    const image = getImageUrl(service) || DEFAULT;
    const unique = service.UniqueWords ?? service.unique_words ?? 0;
    const words = service.Words ?? service.words ?? 0;
    const id = service.ID ?? service.id ?? '';

    return (
        <div className="book">
            <Link to={`/books/${id}`} className="book-link">
                <div className="card-content">
                    <div className="book-image-container">
                        <img
                            src={image}
                            alt={title}
                            className="book-image"
                        />
                    </div>
                    <p className="card-label">{title}</p>
                    <p className="card-label-au">{author}</p>
                    <p className="card-label">Количество уникальных слов</p>
                    <p className="uniq-num-label">{unique}</p>
                    <p className="card-label">Количество слов</p>
                    <p className="uniq-num-label">{words}</p>
                </div>
            </Link>

            <form action="/add-to-cart" method="POST">
                <input type="hidden" name="book_id" value={id} />
                <input type="hidden" name="comment" value="Добавлено в заявку" />
                <button type="submit" className="add-to-cart-btn">Добавить в заявку</button>
            </form>
        </div>
    );
};

export default BookCard;