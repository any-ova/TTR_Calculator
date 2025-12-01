import { MOCK_BOOKS, MOCK_CART, MOCK_ORDER } from './mock';

const API_BASE = (import.meta.env.VITE_API_BASE as string) || '/api';
const MINIO_BASE = ((import.meta.env.VITE_MINIO_BASE as string) || '').replace(/\/$/, '');
const FORCE_MOCK = (import.meta.env.VITE_FORCE_MOCK as string) === 'true';
const DEFAULT_IMG = '/img/default-service.png';

function pick(obj: any, ...keys: string[]) {
    if (!obj) return undefined;
    for (const k of keys) {
        if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k] !== undefined && obj[k] !== null) return obj[k];
    }
    return undefined;
}

export type TemplateBook = {
    ID: string;
    Title: string;
    Author?: string;
    Description?: string;
    ImageURL: string;
    UniqueWords?: number;
    Words?: number;
    Price?: number | null;
    DateFrom?: string | null;
    DateTo?: string | null;
};

function mapApiBook(b: any): TemplateBook {
    if (!b) return { ID: '', Title: 'Без названия', ImageURL: DEFAULT_IMG };

    const id = String(pick(b, 'id', 'ID') ?? '');
    const title = String(pick(b, 'title', 'Title') ?? '');
    const author = String(pick(b, 'author', 'Author') ?? '');
    const description = String(pick(b, 'description', 'Description') ?? '');
    const uniqueWords = Number(pick(b, 'unique_words', 'UniqueWords') ?? 0);
    const words = Number(pick(b, 'words', 'Words') ?? 0);
    const priceRaw = pick(b, 'price', 'Price');
    const price = priceRaw !== undefined && priceRaw !== null ? Number(priceRaw) : null;
    const dateFrom = pick(b, 'date_from', 'DateFrom', 'from') ?? null;
    const dateTo = pick(b, 'date_to', 'DateTo', 'to') ?? null;

    const imageUrl = pick(b, 'image_url', 'ImageURL', 'imageUrl');
    const imageName = pick(b, 'image_name', 'ImageName', 'image') ?? pick(b, 'ImageName', 'image');

    let image = DEFAULT_IMG;
    if (imageUrl) image = String(imageUrl);
    else if (imageName) {
        if (MINIO_BASE) image = `${MINIO_BASE}/${String(imageName).replace(/^\//, '')}`;
        else image = String(imageName);
    }

    return {
        ID: id,
        Title: title || 'Без названия',
        Author: author || '',
        Description: description || '',
        ImageURL: image,
        UniqueWords: uniqueWords,
        Words: words,
        Price: price,
        DateFrom: dateFrom,
        DateTo: dateTo,
    };
}

function buildUrl(path: string, params: Record<string, string | number | undefined> = {}) {
    const u = new URL(`${API_BASE}${path}`, window.location.origin);
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v) !== '') u.searchParams.set(k, String(v));
    });
    return u.toString();
}

function authHeaders(): Headers {
    const headers = new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
}

async function isBackendReachable(): Promise<boolean> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут

        const res = await fetch(`${API_BASE}/books?limit=1`, {
            method: 'GET',
            signal: controller.signal,
            headers: authHeaders()
        });

        clearTimeout(timeoutId);
        return res.ok || res.status === 401 || res.status === 403;
    } catch (err) {
        console.warn('Backend reachability check failed:', err);
        return false;
    }
}

let backendStatusCache: { status: boolean; timestamp: number } | null = null;
const BACKEND_STATUS_CACHE_DURATION = 30000; // 30 секунд

async function getBackendStatus(): Promise<boolean> {
    const now = Date.now();

    if (backendStatusCache && (now - backendStatusCache.timestamp < BACKEND_STATUS_CACHE_DURATION)) {
        return backendStatusCache.status;
    }

    const status = await isBackendReachable();
    backendStatusCache = { status, timestamp: now };
    return status;
}

export async function fetchBooks(params: {
    title?: string;
    author?: string;

} = {}): Promise<TemplateBook[]> {
    if (FORCE_MOCK) return MOCK_BOOKS.map(mapApiBook);

    try {
        const url = buildUrl('/books', {
            title: params.title,
            author: params.author,

        });
        const res = await fetch(url, { headers: authHeaders(), credentials: 'include' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data.items ?? data;
        return arr.map(mapApiBook);
    } catch (err) {
        console.warn('fetchBooks failed, attempting fallback to mock:', err);

        const isReachable = await getBackendStatus();
        if (!isReachable) {
            console.info('Backend is unreachable, using mock data for fetchBooks');
            return MOCK_BOOKS.map(mapApiBook);
        }

        console.warn('fetchBooks failed but backend is reachable, returning empty array');
        return [];
    }
}

export async function fetchBook(id: string): Promise<TemplateBook | null> {
    if (FORCE_MOCK) {
        const found = MOCK_BOOKS.find(b => String(pick(b, 'id')) === String(id));
        return found ? mapApiBook(found) : null;
    }

    try {
        const res = await fetch(`${API_BASE}/books/${id}`, { headers: authHeaders(), credentials: 'include' });
        if (res.status === 404) return null;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return mapApiBook(data);
    } catch (err) {
        console.warn('fetchBook failed', err);

        const isReachable = await getBackendStatus();
        if (!isReachable) {
            console.info('Backend is unreachable, using mock data for fetchBook');
            const found = MOCK_BOOKS.find(b => String(pick(b, 'id')) === String(id));
            return found ? mapApiBook(found) : null;
        }

        return null;
    }
}

export async function fetchCartIcon(): Promise<CartIcon> {
    //if (FORCE_MOCK) return { cartCount: MOCK_CART.cartCount, draftId: MOCK_CART.draftId };

    try {
        const res = await fetch(`${API_BASE}/ttr-calculation/cart-icon`, { headers: authHeaders(), credentials: 'include' });
        if (!res.ok) {
            if (res.status === 401 || res.status === 403) return { cartCount: 0, draftId: null };
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        const count = Number(pick(data, 'count', 'Count', 'cart_count', 'cartCount') ?? 0);
        const draftId = pick(data, 'order_id', 'orderId', 'draft_id', 'draftId') ?? null;
        return { cartCount: count, draftId: draftId !== null ? String(draftId) : null };
    } catch (err) {
        console.warn('fetchCartIcon failed', err);

        const isReachable = await getBackendStatus();
        if (!isReachable) {
            console.info('Backend is unreachable, using mock data for fetchCartIcon');
            return { cartCount: MOCK_CART.cartCount, draftId: MOCK_CART.draftId };
        }

        return { cartCount: 0, draftId: null };
    }
}

export async function fetchOrder(id: string): Promise<OrderResponse | null> {
    if (FORCE_MOCK) return MOCK_ORDER as any;

    if (!/^\d+$/.test(id)) {
        console.warn('fetchOrder: id is not numeric, skipping backend call:', id);
        return null;
    }

    try {
        const res = await fetch(`${API_BASE}/ttr-calculation/${id}`, { headers: authHeaders(), credentials: 'include' });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data && Array.isArray(data.books)) {
            data.books = data.books.map((it: any) => ({ ...it, book: mapApiBook(it.book || it.Book || it.book) }));
        }
        return data as OrderResponse;
    } catch (err) {
        console.warn('fetchOrder failed', err);

        const isReachable = await getBackendStatus();
        if (!isReachable) {
            console.info('Backend is unreachable, using mock data for fetchOrder');
            return MOCK_ORDER as OrderResponse;
        }

        return null;
    }
}

export async function addBookToCart(bookId: number, comment?: string) {
    if (FORCE_MOCK) return { order_id: MOCK_CART.draftId ?? null, book_id: bookId };

    try {
        const res = await fetch(`${API_BASE}/ttr-calculation/cart/books`, {
            method: 'POST',
            headers: Object.assign(Object.fromEntries(authHeaders().entries()), { 'Content-Type': 'application/json' }),
            body: JSON.stringify({ book_id: bookId, comment: comment ?? '' }),
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn('addBookToCart failed', err);

        const isReachable = await getBackendStatus();
        if (!isReachable) {
            console.info('Backend is unreachable, simulating success for addBookToCart');
            // Возвращаем mock-ответ когда бэкенд недоступен
            return { order_id: MOCK_CART.draftId ?? null, book_id: bookId };
        }

        throw err;
    }
}