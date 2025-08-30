'use client';

import { useEffect, useState } from 'react';

export function ApiData({ url }: { url: string }) {
    console.log(url)
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetch(url)
            .then((res) => {
                console.log(res)
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(err.message));
    }, [url]);
    console.log(data)
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return data;
}
