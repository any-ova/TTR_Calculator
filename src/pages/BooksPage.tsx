// Используем обновлённый api.fetchBooks (с хорошим моком)
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';
import { Book } from '../types';

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        load();
    }, []);

    async function load(query?: string) {
        const params: Record<string, string | undefined> = {};
        if (query) params.title = query;
        const res = await fetchBooks(params);
        setBooks(res);
    }

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        load(search || undefined);
    };

    return (
        <>
            <h1 className="page-title">Книги</h1>
            <div className="search-container-wrapper">
                <form className="search-form" onSubmit={onSearch}>
                    <div className="search-container">
                        <input type="text" name="search" placeholder="Поиск автора" value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
                        <button type="submit" className="search-button">🔍</button>
                    </div>
                </form>
            </div>

            <div className="books-container">
                {books.length ? books.map((b) => (
                    <div className="book" key={b.ID}>
                        <a href={`/book/${b.ID}`} className="book-link">
                            <div className="card-content">
                                <img src={b.ImageURL || '/img/default-service.png'} alt={b.Title} />
                                <p className="card-label">{b.Title}</p>
                                <p className="card-label-au">{b.Author}</p>
                                <p className="card-label">Количество уникальных слов</p>
                                <p className="uniq-num-label">{b.UniqueWords}</p>
                                <p className="card-label">Количество слов</p>
                                <p className="uniq-num-label">{b.Words}</p>
                            </div>
                        </a>

                        <form action="/add-to-cart" method="POST" style={{ marginTop: 10, textAlign: 'center' }}>
                            <input type="hidden" name="book_id" value={b.ID} />
                            <input type="hidden" name="comment" value="Добавлено в заявку" />
                            <button type="submit" className="add-to-cart-btn">Добавить в заявку</button>
                        </form>

                        <form action="/delete-book" method="POST" style={{ marginTop: 5, textAlign: 'center' }}>
                            <input type="hidden" name="book_id" value={b.ID} />
                            <button type="submit" className="delete-btn">Удалить</button>
                        </form>
                    </div>
                )) : (
                    <>
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.5rem', margin: '2rem 0', color: '#777' }}>Книги не найдены</p>
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.3rem' }}>Проверьте подключение к репозиторию</p>
                    </>
                )}
            </div>
        </>
    );
};

export default BooksPage;