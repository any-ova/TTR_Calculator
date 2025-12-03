export const ROUTES = {
    HOME: '/',
    BOOKS: '/books',
    BOOK_DETAIL: '/books/:id',
    ORDER: '/order/:id',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_LABELS: Record<RouteKey, string> = {
    HOME: 'Главная',
    BOOKS: 'Книги',
    BOOK_DETAIL: 'Книга',
    ORDER: 'Заявка',
};