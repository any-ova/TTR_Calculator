import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCartIcon } from '../services/api';

const CartBubble: React.FC = () => {
    const location = useLocation();

    // Прячем "корзину" на главной странице (корень '/')
    if (location.pathname === '/') {
        return null;
    }

    const [cartCount, setCartCount] = useState<number>(0);
    const [draftId, setDraftId] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        fetchCartIcon().then(r => {
            if (!mounted) return;
            setCartCount(r.cartCount || 0);
            setDraftId(r.draftId || null);
        });
        return () => { mounted = false; };
    }, []);

    return (
        <>
            {cartCount > 0 ? (
                <a href={`/order/${draftId ?? ''}`} className="bubble-btn" aria-label="Корзина">
                    <img src="/img/cart.png" alt="Корзина" className="cart-icon" />
                    <span className="bubble-count">{cartCount}</span>
                </a>
            ) : (
                <div className="bubble-btn disabled" aria-hidden>
                    <img src="/img/cart.png" alt="Корзина" className="cart-icon" />
                    <span className="bubble-count">0</span>
                </div>
            )}
        </>
    );
};

export default CartBubble;