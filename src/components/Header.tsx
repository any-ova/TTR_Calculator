import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img.png';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed-top">
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <img src={logo} alt="Лого" style={{ height: '4rem', marginRight: '1.5rem' }} />
                </Link>
                <h1>Палитра слов</h1>

                {isMobile ? (
                    <button
                        onClick={toggleMenu}
                        style={{
                            marginLeft: 'auto',
                            background: 'none',
                            border: 'none',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: '#333',
                        }}
                        aria-label="Открыть меню"
                        className="burger-toggle"
                    >
                        ☰
                    </button>
                ) : (
                    <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: 'auto' }}>
                        <Link to="/" className="home-btn">Главная</Link>
                        <Link to="/books" style={{ textDecoration: 'none', color: '#000' }}>Книги</Link>
                    </nav>
                )}
            </div>

            {/* Mobile menu */}
            {isMobile && isMenuOpen && (
                <nav
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '1rem 2rem',
                        background: '#fff',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        marginTop: '0.5rem',
                        borderRadius: '0.6rem',
                    }}
                >
                    <Link
                        to="/"
                        className="home-btn"
                        onClick={() => setIsMenuOpen(false)}
                        style={{ textAlign: 'center' }}
                    >
                        Главная
                    </Link>
                    <Link
                        to="/books"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            textAlign: 'center',
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '1.3rem',
                            fontWeight: '600',
                        }}
                    >
                        Книги
                    </Link>
                </nav>
            )}
        </header>
    );
}