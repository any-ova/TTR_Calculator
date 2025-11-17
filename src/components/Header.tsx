import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="fixed-top">
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Link to="/"><img src="/img/img.png" alt="Лого" style={{ height: 48, marginRight: 16 }} /></Link>
                <h1 style={{ margin: 0, flex: 1 }}>Палитра слов</h1>
                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Link to="/" className="home-btn">Главная</Link>
                    <Link to="/books" style={{ textDecoration: 'none', color: '#000' }}>Книги</Link>
                    <Link to="/ttr-calculation" style={{ textDecoration: 'none', color: '#000' }}>Расчёты</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;