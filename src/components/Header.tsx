// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="fixed-top">
            <Link to="/"><img src="/img/img.png" alt="Лого" /></Link>
            <h1>Палитра слов</h1>
            <Link to="/" className="home-btn">Главная</Link>
            {/* bubble removed from here; use CartBubble component */}
        </header>
    );
};

export default Header;