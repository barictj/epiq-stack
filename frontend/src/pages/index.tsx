

import TopPlayerList from '@components/TopPlayerList/TopPlayerList';

import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchTopPlayers } from '../components/serverApi';
import Home from '@components/Home/Home';

export async function getServerSideProps() {


    // Optionally fetch top players (e.g., for leaderboard or featured section)
    const topPlayers = await fetchTopPlayers({ year: 1989, limit: 20, sortBy: 'epiq_per_game' });


    return {
        props: {
            topPlayers
        }
    };
}

export default function Index({
    topPlayers
}: {

    topPlayers: any[];
}) {

    const topFive = topPlayers.slice(0, 5);
    const topNotFive = topPlayers.slice(5);
    return (
        <>
            <Home items={topPlayers} />
        </>
    );
}
