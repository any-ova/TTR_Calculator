// src/services/image.ts
// Utility to get image URL consistently across components.
// Uses VITE_MINIO_BASE when backend provides image_name.

const DEFAULT_IMG = '/img/default-service.png';
const MINIO_BASE = ((import.meta.env.VITE_MINIO_BASE as string) || '').replace(/\/$/, '');

export function getImageUrl(item: any): string {
    if (!item) return DEFAULT_IMG;

    // 1) full URL fields from backend (prefer these)
    const url = item.ImageURL ?? item.image_url ?? item.imageUrl ?? item.image;
    if (url && typeof url === 'string') {
        // if it's already a data URL or http(s) URL -- just return
        return url;
    }

    // 2) image name stored in DB (image_name/ImageName)
    const imageName = item.image_name ?? item.ImageName ?? item.Image;
    if (imageName) {
        if (MINIO_BASE) {
            // MINIO_BASE should be like '/minio/my-bucket' (recommended) or a full URL
            return `${MINIO_BASE}/${String(imageName).replace(/^\//, '')}`;
        }
        // fallback: return the name (may be an absolute path)
        return String(imageName);
    }

    // 3) nothing -> default
    return DEFAULT_IMG;
}

export default getImageUrl;