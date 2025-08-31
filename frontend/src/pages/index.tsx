import { fetchItemsSSR } from '../components/serverApi';

export async function getServerSideProps() {
    const items = await fetchItemsSSR();
    return { props: { items } };
}

export default function Home({ items }: { items: any[] }) {
    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>✅ next</h1>
            <p>Bubba, I love you the <h2>MOST</h2></p>
            {items && items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.name} {item.completed ? '✅' : '❌'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items found.</p>
            )}
        </main>
    );
}
