import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCart } from '../modules/api';
import cartIcon from '../assets/cart.png';

export function CartBubble() {
    const location = useLocation();

    // Скрываем на главной
    if (location.pathname === '/') {
        return null;
    }

    const [cartCount, setCartCount] = useState(0);
    const [draftId, setDraftId] = useState("-1");
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const r = await getCart();
            setCartCount(r.count);
            setDraftId(r.order_id);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        fetchCart().then(() => {
            if (cartCount > 0) {
                window.location.href = `/order/${draftId ?? ''}`;
            }
        });
    };

    if (cartCount > 0 && !isLoading) {
        return (
            <a
                href={`/order/${draftId ?? ''}`}
                className="bubble-btn"
                onClick={handleClick}
                aria-label="Корзина"
            >
                <img src={cartIcon} alt="Корзина" className="cart-icon" />
                <span className="bubble-count">{cartCount}</span>
            </a>
        );
    }

    return (
        <div
            className="bubble-btn disabled"
            onClick={handleClick}
            aria-hidden={!isLoading}
        >
            <img src={cartIcon} alt="Корзина" className="cart-icon" />
            <span className="bubble-count">{cartCount}</span>
        </div>
    );
}
