import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getImageUrl from '../services/image';

/**
 * OrderPage - визуально повторяет серверный шаблон:
 * - header у вас уже в Header компоненте (fixed-top)
 * - внутри отображается секция заголовка заявки с form POST /update-order-title
 * - stats-table выводится в одну строчку (flex nowrap)
 * - список книг рендерится как в шаблоне: order-header + order-item
 *
 * Компонент получает данные через fetchOrder (в api.ts) — ожидается, что он возвращает
 * объект в виде { order: {...}, books: [...] } или совместимый формат.
 * Если backend не доступен, компонент корректно покажет "Заявка не найдена".
 */

import { fetchOrder } from '../services/api';

const OrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<any | null>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            if (!id) {
                setData(null);
                setBooks([]);
                setLoading(false);
                return;
            }
            try {
                const res = await fetchOrder(String(id));
                if (!mounted) return;
                if (!res) {
                    setData(null);
                    setBooks([]);
                } else {
                    // Normalize: backend may return { order: {...}, books: [...] }
                    const order = res.order ?? res.Order ?? res;
                    const booksRaw = res.books ?? res.Books ?? res.booksResp ?? [];
                    const normalized = Array.isArray(booksRaw)
                        ? booksRaw.map((it: any) => {
                            const book = it.book ?? it.Book ?? it;
                            const comment = it.comment ?? it.Comment ?? '';
                            return { book, comment };
                        })
                        : [];
                    setData(order ?? null);
                    setBooks(normalized);
                }
            } catch (e) {
                console.error('fetchOrder error', e);
                setData(null);
                setBooks([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, [id]);

    if (loading) {
        return <div style={{ padding: 20 }}>Загрузка...</div>;
    }

    // If no order data — show message (same as серверный шаблон "Нет активных заказов")
    if (!data) {
        return (
            <div className="container-wrapper" style={{ paddingTop: 96 }}>
                <p style={{ textAlign: 'center', fontSize: '1.6rem', margin: '3rem 0', color: '#777' }}>Заявка не найдена</p>
            </div>
        );
    }

    // Compute stats (compat with different field names)
    const totalWords = data.words ?? data.Words ?? data.TotalWords ?? 0;
    const totalUnique = data.unique_words ?? data.UniqueWords ?? data.TotalUniqueWords ?? 0;
    const ttr = data.ttr ?? data.TTR ?? data.TTRPercent ?? 0;
    const orderId = data.id ?? data.ID ?? id;
    const orderTitle = data.title ?? data.Title ?? '';

    return (
        <div className="container-wrapper" style={{ paddingTop: 96 }}>
            {/* Title section — exact visual like template, POST form to /update-order-title */}
            {data && (
                <div className="order-title-section" style={{ margin: '20px 0', textAlign: 'center' }}>
                    <form action="/update-order-title" method="POST" style={{ display: 'inline-block' }}>
                        <input type="hidden" name="order_id" value={orderId} />
                        <input
                            type="text"
                            name="title"
                            defaultValue={orderTitle}
                            placeholder="Введите название заявки"
                            style={{
                                fontSize: '1.4rem',
                                padding: '8px 12px',
                                width: 300,
                                border: '1px solid #ccc',
                                borderRadius: 4,
                            }}
                            maxLength={255}
                        />
                        <button type="submit" className="detail-btn" style={{ marginLeft: 8 }}>
                            Сохранить
                        </button>
                    </form>
                </div>
            )}

            {/* Stats table — forced single row via inline flex nowrap to guarantee one line */}
            <div
                className="stats-table"
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.2rem',
                    marginBottom: '1.5rem',
                }}
            >
                <div style={{ fontWeight: 700, color: '#000', textAlign: 'right', paddingRight: '1rem' }}>Итоговое количество слов:</div>
                <div style={{ textAlign: 'left', paddingLeft: '1rem' }}>{totalWords}</div>

                <div style={{ fontWeight: 700, color: '#000', textAlign: 'right', paddingRight: '1rem' }}>Уникальных слов:</div>
                <div style={{ textAlign: 'left', paddingLeft: '1rem' }}>{totalUnique}</div>

                <div style={{ fontWeight: 700, color: '#000', textAlign: 'right', paddingRight: '1rem' }}>Всего книг:</div>
                <div style={{ textAlign: 'left', paddingLeft: '1rem' }}>{books.length}</div>

                <div style={{ fontWeight: 700, color: '#000', textAlign: 'right', paddingRight: '1rem' }}>TTR Автора:</div>
                <div style={{ textAlign: 'left', paddingLeft: '1rem' }}>{String(ttr)}%</div>
            </div>

            {/* Header row (matching template) */}
            <div className="order-header">
                <span>Название</span>
                <span>Слов всего</span>
                <span>Уникальных слов</span>
                <span>Автор</span>
                <span>Комментарий</span>
            </div>

            {/* Order books list — same markup as template */}
            {books && books.length > 0 ? (
                books.map((item: any, idx: number) => {
                    const book = item.book ?? {};
                    const title = book.Title ?? book.title ?? 'Без названия';
                    const author = book.Author ?? book.author ?? '';
                    const image = getImageUrl(book);
                    const words = book.Words ?? book.words ?? 0;
                    const unique = book.UniqueWords ?? book.unique_words ?? 0;
                    const comment = item.comment ?? item.Comment ?? '';

                    return (
                        <div className="order-item" key={idx}>
                            <img src={image} alt={title} className="order-cover" />
                            <div className="item-info">
                                <div className="item-row">
                                    <div className="book-title"><strong>{title}</strong></div>
                                    <div className="book-words">{words}</div>
                                    <div className="book-unique">{unique}</div>
                                    <div className="book-author grey-author">{author}</div>
                                    <div className="comment-section">
                                        <textarea placeholder="Добавьте комментарий...">{comment}</textarea>
                                    </div>
                                    <div className="book-actions">
                                        <a href={`/book/${book.ID ?? book.id}`} className="detail-btn">Подробнее</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.6rem', margin: '3rem 0', color: '#777' }}>Нет активных заказов</p>
            )}

            {/* Delete form like template */}
            {data && (
                <form action="/delete-order" method="POST" style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <input type="hidden" name="order_id" value={orderId} />
                    <button type="submit" className="delete-order-btn" onClick={(e) => { if(!confirm('Вы уверены, что хотите удалить эту заявку?')) e.preventDefault(); }}>
                        Удалить заявку
                    </button>
                </form>
            )}
        </div>
    );
};

export default OrderPage;