import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

export function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { immediate = true} = options;

    const fetchData = useCallback(async () => {
        if (!url) return;

        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.get(url);
            setData(response.data);
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [fetchData, immediate]);

    return { data, loading, error, fetchData };
}
