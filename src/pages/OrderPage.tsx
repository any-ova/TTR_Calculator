// src/pages/OrderPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resolveImageUrl } from '../modules/api';

// Пока не реализуем редактирование — только просмотр
export function OrderPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Временно показываем заглушку — можно расширить позже
    useEffect(() => {
        alert('Страница заявки пока не реализована в API. Возвращаемся к каталогу.');
        navigate('/books');
    }, [id, navigate]);

    return <div>Загрузка заявки...</div>;
}