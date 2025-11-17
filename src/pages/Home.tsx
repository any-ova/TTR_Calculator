// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '1.5rem' }}>
            <h1>Лабораторная 5 — Палитра слов</h1>
            <p>
                Цель: разработать SPA на React + TypeScript, подключённый к вашему веб‑сервису.
            </p>
            <p>
                Для просмотра списка услуг перейдите на страницу <Link to="/services">Услуги</Link>.
            </p>
            <h4>Покажите в демонстрации</h4>
            <ol>
                <li>Сначала: mock-режим (VITE_FORCE_MOCK=true) — показать три страницы без бэка.</li>
                <li>Затем: запустить backend и показать fetch через proxy (Network).</li>
                <li>Показать, как картинки формируются из Minio (VITE_MINIO_BASE) или как backend возвращает image_url.</li>
                <li>Показать изменение БД через Adminer и обновление фронтенда.</li>
            </ol>
        </div>
    );
};

export default Home;