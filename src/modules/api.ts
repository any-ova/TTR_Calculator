import type { Book } from '../lib/types';
import { MOCK_BOOKS } from './mock';
import placeholder from '../assets/placeholder.png';

const API_BASE = '/api';
const MINIO_URL = 'http://localhost:9000';

export function resolveImageUrl(relativePath: string | null | undefined): string {
    // Если путь пустой, null, undefined — сразу placeholder
    if (!relativePath || relativePath.trim() === '') {
        return placeholder;
    }

    // Если это абсолютный путь (начинается с /) — это НЕ относительный путь к MinIO!
    // Это путь к public/, и его не надо проксировать через MINIO_URL
    if (relativePath.startsWith('/')) {
        return relativePath; // например: "/img/book1.jpg"
    }

    // Если это http(s) — оставляем как есть
    if (relativePath.startsWith('http')) {
        return relativePath;
    }

    // Иначе — считаем, что это имя файла в MinIO
    return `${MINIO_URL}/${relativePath.replace(/^\//, '')}`;
}

export async function getBooks(title = '', author = ''): Promise<Book[]> {
    try {
        const params = new URLSearchParams();
        if (title) params.set('title', title);
        if (author) params.set('author', author);
        const url = `${API_BASE}/books?${params}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        return (Array.isArray(data) ? data : data.items || []).map((b: any) => ({
            id: b.id ?? b.ID ?? 0,
            Title: b.Title ?? b.title ?? 'Без названия',
            Author: b.Author ?? b.author ?? '',
            Description: b.Description ?? b.description ?? '',
            Words: b.Words ?? b.words ?? 0,
            UniqueWords: b.UniqueWords ?? b.unique_words ?? 0,
            ImageURL: b.ImageURL ?? b.image_url ?? '',
        }));
    } catch {
        return MOCK_BOOKS.filter(b =>
            b.Title.toLowerCase().includes(title.toLowerCase()) &&
            b.Author.toLowerCase().includes(author.toLowerCase())
        );
    }
}

export async function getBookById(id: number): Promise<Book> {
    try {
        const res = await fetch(`${API_BASE}/books/${id}`);
        if (!res.ok) throw new Error();
        const b = await res.json();
        return {
            id: b.id ?? b.ID ?? 0,
            Title: b.Title ?? b.title ?? 'Без названия',
            Author: b.Author ?? b.author ?? '',
            Description: b.Description ?? b.description ?? '',
            Words: b.Words ?? b.words ?? 0,
            UniqueWords: b.UniqueWords ?? b.unique_words ?? 0,
            ImageURL: resolveImageUrl(b.ImageURL ?? b.image_url ?? ''),
        };
    } catch {
        const mock = MOCK_BOOKS.find(b => b.id === id);
        if (mock) return mock;
        return {
            id: 0,
            Title: 'Книга не найдена',
            Author: '',
            Description: '',
            Words: 0,
            UniqueWords: 0,
            ImageURL: '',
        };
    }
}

export async function getCartIcon(): Promise<{ cartCount: number; draftId: string | null }> {
    try {
        const res = await fetch(`${API_BASE}/ttr-calculation/cart-icon`);
        if (!res.ok) return { cartCount: 0, draftId: null };
        const data = await res.json();
        return {
            cartCount: data.cartCount ?? data.count ?? 0,
            draftId: data.draftId ?? data.orderId ?? null,
        };
    } catch {
        return { cartCount: 0, draftId: null };
    }
}