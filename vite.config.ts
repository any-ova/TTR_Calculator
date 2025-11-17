import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            // Проксируем /api на backend (Go) — убирает проблему CORS в dev
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
            '/minio': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});