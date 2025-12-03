import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCartIcon } from '../modules/api';
import cartIcon from '../assets/cart.png';

export function CartBubble() {
    const location = useLocation();

    const [cartCount, setCartCount] = useState(0);
    const [draftId, setDraftId] = useState<string | null>(null);

    useEffect(() => {
        if (location.pathname === '/') return;

        getCartIcon().then(r => {
            setCartCount(r.cartCount || 0);
            setDraftId(r.draftId);
        });
    }, [location.pathname]);

    if (location.pathname === '/') {
        return null;
    }

    if (cartCount > 0) {
        return (
            <a
                href={`/order/${draftId ?? ''}`}
                className="bubble-btn"
                aria-label="Корзина"
            >
                <img src={cartIcon} alt="Корзина" className="cart-icon" />
                <span className="bubble-count">{cartCount}</span>
            </a>
        );
    }

    return (
        <div className="bubble-btn disabled" aria-hidden>
            <img src={cartIcon} alt="Корзина" className="cart-icon" />
            <span className="bubble-count">0</span>
        </div>
    );
}