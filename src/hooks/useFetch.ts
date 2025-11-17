import { useState, useEffect } from 'react';

export function useAsync<T>(asyncFn: () => Promise<T>, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        asyncFn()
            .then((d) => {
                if (!mounted) return;
                setData(d);
                setError(null);
            })
            .catch((e) => {
                if (!mounted) return;
                setError(e);
                setData(null);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });
        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { data, loading, error };
}