import { useEffect, useState } from 'react';
import { fetchItemsSSR } from '@components/serverApi';

type Item = {
    id: number;
    name: string;
};

export default function PlayerList() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItemsSSR().then(setItems);
    }, []);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}
