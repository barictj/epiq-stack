import Home from '@components/Home/Home';
import PlayerList from '@components/PlayerList/PlayerList';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchItemsSSR, fetchPlayerStatsByYear } from '../components/serverApi';

export async function getServerSideProps() {
    console.log('Starting SSR data fetch...');
    const items = await fetchItemsSSR();

    // Fetch year-by-year stats for each player
    // Define the type for item, e.g., ItemType. Replace with your actual type if available.
    type ItemType = { id: string; name: string;[key: string]: any };
    console.log('Fetched items:', items);
    console.log('Type of items:', typeof items);
    console.log('Is array:', Array.isArray(items));

    const enrichedItems = await Promise.all(
        items.map(async (item: ItemType) => {
            console.log(`Enriching player ${item.id}...`);

            const yearStats = await fetchPlayerStatsByYear(item.id);
            console.log(yearStats)
            return {
                ...item,
                yearStats
            };
        })
    );

    return { props: { items: enrichedItems } };
}

export default function Index({ items }: { items: { id: string; name: string; yearStats: any;[key: string]: any }[] }) {
    console.log('Rendering with items:', items);
    return (
        <main style={{ backgroundColor: '#f0f2f5', paddingTop: '20px', minHeight: '100vh' }}>
            <Home items={items} />
            <PlayerList items={items} />
        </main>
    );
}
