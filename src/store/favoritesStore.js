import { useState } from 'react';

export default function useFavorites() {
    const [ids, setIds] = useState(new Set());
    const toggle = (id) => setIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });
    return { ids, toggle };
}