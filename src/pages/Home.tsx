import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return (
        <div className="home-root">
            <section className="cover" aria-label="Вступительный блок — Палитра слов">
                <div className="cover-video" aria-hidden="true">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="cover-video-element"
                    >
                        <source src="/img/video.mp4" type="video/mp4" />
                        Ваш браузер не поддерживает фоновое видео.
                    </video>
                    <div className="cover-video-overlay" />
                </div>

                <div className="cover-content container-wrapper">
                    <div className="cover-text">
                        <h1>Палитра слов — Книги и лексический анализ</h1>
                        <p className="lead">
                            Портал «Палитра слов» создан для работы с текстами книг: загрузка произведений,
                            расчёт показателей лексического разнообразия (TTR), сравнение авторов
                            и результатов для исследовательских задач. Инструмент помогает
                            лингвистам быстрее получать качественные метрики и упрощает корпусную работу.
                        </p>

                        <div className="cover-buttons">
                            <Link className="btn btn-primary btn-lg" to="/books">
                                Перейти к книгам
                            </Link>
                            <Link className="btn btn-secondary btn-lg" to="/ttr-calculation">
                                Рассчитать TTR
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;