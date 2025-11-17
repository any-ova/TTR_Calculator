// src/services/order.ts
// Small helper for order-related API calls (add functions here to avoid editing big api.ts)

const API_BASE = (import.meta.env.VITE_API_BASE as string) || '/api';

// re-use auth headers if you have them in api.ts; duplicate minimal helper:
function authHeaders(): Headers {
    const headers = new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
}

/**
 * updateOrderTitle - PUT /api/ttr-calculation/:id
 * body: { title: string }
 */
export async function updateOrderTitle(orderId: string | number, title: string) {
    const url = `${API_BASE}/ttr-calculation/${orderId}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: Object.assign(Object.fromEntries(authHeaders().entries()), { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ title }),
        credentials: 'include',
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`updateOrderTitle failed: ${res.status} ${res.statusText} ${text}`);
    }
    return await res.json();
}

export default {
    updateOrderTitle,
};