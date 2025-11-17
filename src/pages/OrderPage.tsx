// src/pages/OrderPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../services/api';

const OrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<any | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchOrder(id).then((o) => setOrder(o));
    }, [id]);

    if (!order) return <div style={{ padding: 20 }}>Загрузка...</div>;

    return (
        <div className="container-wrapper" style={{ paddingTop: 24 }}>
            <div className="stats-table" style={{ marginBottom: 24 }}>
                <div>Итоговое количество слов:</div>
                <div>{order.TotalWords ?? 0}</div>
                <div>Уникальных слов:</div>
                <div>{order.TotalUniqueWords ?? 0}</div>
                <div>Всего книг:</div>
                <div>{(order.OrderBooks && order.OrderBooks.length) || 0}</div>
                <div>TTR Автора:</div>
                <div>{order.TTR ?? '—'}%</div>
            </div>

            <div className="order-header" style={{ gap: '2rem', padding: '1rem 1.5rem' }}>
                <span>Название</span>
                <span>Слов всего</span>
                <span>Уникальных слов</span>
                <span>Автор</span>
                <span>Комментарий</span>
            </div>

            {order.OrderBooks && order.OrderBooks.length > 0 ? (
                order.OrderBooks.map((item: any, idx: number) => (
                    <div className="order-item" key={idx} style={{ padding: '1.2rem 1.8rem', gap: '2rem' }}>
                        <img src={item.Book.ImageURL || '/img/default-service.png'} alt={item.Book.Title} className="order-cover" />
                        <div className="item-info" style={{ flex: 1 }}>
                            <div className="item-row" style={{ gap: '2rem' }}>
                                <div className="book-title" style={{ minWidth: 220 }}><strong>{item.Book.Title}</strong></div>
                                <div className="book-words" style={{ width: 120 }}>{item.Book.Words}</div>
                                <div className="book-unique" style={{ width: 120 }}>{item.Book.UniqueWords}</div>
                                <div className="book-author grey-author" style={{ minWidth: 140 }}>{item.Book.Author}</div>
                                <div className="comment-section" style={{ flex: 1 }}>
                  <textarea
                      placeholder="Добавьте комментарий..."
                      defaultValue={item.Comment ?? ''}
                      style={{ width: '100%', minWidth: 300, maxWidth: '60ch', height: 72, resize: 'vertical' }}
                  />
                                </div>
                                <div className="book-actions" style={{ minWidth: 120 }}>
                                    <a href={`/book/${item.Book.ID}`} className="detail-btn">Подробнее</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.6rem', margin: '3rem 0', color: '#777' }}>Нет активных заказов</p>
            )}

            {order && (
                <form action="/delete-order" method="POST" style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <input type="hidden" name="order_id" value={order.ID || ''} />
                    <button type="submit" className="delete-order-btn">Удалить заявку</button>
                </form>
            )}
        </div>
    );
};

export default OrderPage;