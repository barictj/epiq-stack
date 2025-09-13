

import { useLeague } from '../context/LeagueContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchTopPlayers } from '../components/serverApi';
import Home from '@components/Home/Home';

export async function getServerSideProps(context: any) {

    const league = context.query.league || 'NBA';
    // Optionally fetch top players (e.g., for leaderboard or featured section)
    const topPlayers = await fetchTopPlayers({ year: 1999, limit: 50, sortBy: 'epiq_per_game' });

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

    const topFive = topPlayers.slice(0, 30);
    const topNotFive = topPlayers.slice(5);
    return (
        <>
            <Home items={topPlayers} />
        </>
    );
}
