import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CartBubble from './components/CartBubble';
import Home from './pages/Home';
import Services from './pages/Services';
import BookDetailPage from './pages/BookDetailPage';
import OrderPage from './pages/OrderPage';
import Breadcrumbs from './components/Breadcrumbs';

const App: React.FC = () => {
    return (
        <>
            <Header />

            <CartBubble />
            <div style={{ paddingTop: 96 }} className="container-wrapper">
                <Breadcrumbs />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/book/:id" element={<BookDetailPage />} />
                    <Route path="/order/:id" element={<OrderPage />} />
                </Routes>
            </div>
        </>
    );
};

export default App;