import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './components/Header';
import { CartBubble } from './components/CartBubble';
import { Breadcrumbs } from './components/Breadcrumbs';
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { OrderPage } from './pages/OrderPage';

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <CartBubble />
                <div className="container-wrapper">
                    <Breadcrumbs />
                    <Routes>
                        <Route path="/TTR_Calculator/" element={<HomePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/books/:id" element={<BookDetailPage />} />
                        <Route path="/order/:id" element={<OrderPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}