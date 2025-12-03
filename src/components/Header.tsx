// src/components/Header.tsx
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

    useEffect(() => {
        if (isMobile && isMenuOpen) {
            document.body.style.overflowX = 'hidden';
        } else {
            document.body.style.overflowX = '';
        }
        return () => {
            document.body.style.overflowX = '';
        };
    }, [isMobile, isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header
            className="fixed-top"
            style={{
                zIndex: 1030,
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'hidden',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0.5rem 1rem',
                    boxSizing: 'border-box',
                    minWidth: 0,
                }}
            >
                <div style={{ flexShrink: 0 }}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <img
                            src={logo}
                            alt="Лого"
                            style={{ height: '3.5rem' }}
                        />
                    </Link>
                </div>

                <div
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '1.4rem',
                        fontWeight: '600',
                        margin: '0 1rem',
                    }}
                >
                    Палитра слов
                </div>

                <div style={{ flexShrink: 0 }}>
                    {isMobile ? (
                        <button
                            onClick={toggleMenu}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '2rem',
                                cursor: 'pointer',
                                color: '#333',
                                padding: 0,
                                margin: 0,
                            }}
                            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                        >
                            ☰
                        </button>
                    ) : (
                        <nav style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                            <Link to="/" className="home-btn">Главная</Link>
                            <Link to="/books" style={{ textDecoration: 'none', color: '#000' }}>
                                Книги
                            </Link>
                        </nav>
                    )}
                </div>
            </div>

            {isMobile && isMenuOpen && (
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        width: '100%',
                        padding: '0 1rem',
                        boxSizing: 'border-box',
                    }}
                >
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
                </div>
            )}
        </header>
    );
}