import React from 'react';

export async function getServerSideProps() {
    const res = await fetch('http://backend:3001/api/items');
    const items = await res.json();
    console.log(items)
    return {
        props: { items },
    };
}

export default function Home({ items }: { items: any[] }) {
    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}
