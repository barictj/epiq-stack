import { useEffect, useState } from 'react';
import { fetchItemsSSR } from '@components/serverApi';

type Item = {
    id: number;
    name: string;
};

const PlayerList = ({ items = [] }: { items?: Item[] }) => {


    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>Guys name {item.name}</div>
            ))}
        </div>
    );
};

export default PlayerList;
