import Link from 'next/link';
import Home from '@components/Home/Home';
import PlayerList from '@components/PlayerList/PlayerList';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchItemsSSR, fetchPlayerStatsByYear } from '../components/serverApi';

export async function getServerSideProps() {
    const items = await fetchItemsSSR();

    // Fetch year-by-year stats for each player
    // Define the type for item, e.g., ItemType. Replace with your actual type if available.
    type ItemType = { id: string; name: string;[key: string]: any };


    const enrichedItems = await Promise.all(
        items.map(async (item: ItemType) => {
            const yearStats = await fetchPlayerStatsByYear(item.id);

            return {
                ...item,
                yearStats
            };
        })
    );

    return { props: { items: enrichedItems } };
}

export default function Index({ items }: { items: { id: string; name: string; yearStats: any;[key: string]: any }[] }) {
    return (
        <>


            <Home items={items} />

        </>
    );
}
