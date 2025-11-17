import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '1.5rem' }}>
            <h1>Лабораторная 5 — Палитра слов</h1>
            <p>
                Цель: разработать SPA на React + TypeScript, подключённый веб‑сервису.
            </p>
            <p>
                Для просмотра списка книг перейдите на страницу <Link to="/books">Книги</Link>.
            </p>
            <p>
               Расчёт TTR авторов книг!
            </p>
        </div>
    );
};

export default Home;