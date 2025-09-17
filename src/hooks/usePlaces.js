import { useEffect, useState } from 'react';
import { haversine } from '../utils/geo';
import { fetchCafes } from '../services/places';

export const SORTS = {
    RATING_DESC: { key: 'RATING_DESC', label: 'Top rated' },
    DIST_DESC: { key: 'DIST_DESC', label: 'Closest' },
    REVIEWS_DESC: { key: 'REVIEWS_DESC', label: 'Most reviewed' },
};

export default function usePlaces(coords, query) {
    const [cafes, setCafes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!coords) return;
        (async () => {
            setLoading(true);
            setError('');
            try {
                const data = await fetchCafes(coords, query);
                const withDistance = data.map((c) => ({ ...c, distance: haversine(coords.let, coords.lng, c.lat, c.lng) }));
                setCafes(withDistance);
            } catch (e) {
                setError('Failed to load cafés');
            } finally {
                setLoading(false);
            }
        })();
    }, [coords, query]);
    return { cafes, loading, error };
}