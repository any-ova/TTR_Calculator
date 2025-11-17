import React from 'react';
import { TemplateBook } from '../services/api';

const BookCard: React.FC<{ book: TemplateBook }> = ({ book }) => {
    return (
        <div className="book">
            <a href={`/book/${book.ID}`} className="book-link">
                <div className="card-content">
                    <img src={book.ImageURL || '/img/default-service.png'} alt={book.Title} />
                    <p className="card-label">{book.Title}</p>
                    <p className="card-label-au">{book.Author}</p>
                    <p className="card-label">Количество уникальных слов</p>
                    <p className="uniq-num-label">{book.UniqueWords}</p>
                    <p className="card-label">Количество слов</p>
                    <p className="uniq-num-label">{book.Words}</p>
                </div>
            </a>
            <form action="/add-to-cart" method="POST" style={{ marginTop: 10, textAlign: 'center' }}>
                <input type="hidden" name="book_id" value={book.ID} />
                <input type="hidden" name="comment" value="Добавлено в заявку" />
                <button type="submit" className="add-to-cart-btn">Добавить в заявку</button>
            </form>
            <form action="/delete-book" method="POST" style={{ marginTop: 5, textAlign: 'center' }}>
                <input type="hidden" name="book_id" value={book.ID} />
                <button type="submit" className="delete-btn">Удалить</button>
            </form>
        </div>
    );
};

export default BookCard;