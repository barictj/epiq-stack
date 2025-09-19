import Home from '@components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchTopPlayers } from '../components/serverApi';




export async function getServerSideProps(context: any) {
    const {
        league = 'WNBA',
        year = 2024,
        sortBy = 'seasonal_epiq',
        startAt = 0,
        endBy = 24,
        direction = 'DESC',
    } = context.query;

    const topPlayersRaw = await fetchTopPlayers({
        league: String(league),
        year: Number(year),
        sortBy: String(sortBy),
        startAt: Number(startAt),
        endBy: Number(endBy),
        direction: String(direction),
    });
    const topPlayers = topPlayersRaw || [];


    return {
        props: {
            topPlayers,
            year: Number(year),
            sortBy: String(sortBy),
            direction: String(direction).toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
            league: String(league),
        },
    };
}

export default function Index({
    topPlayers,
    year,
    sortBy,
    direction,
    league,
}: {

    topPlayers: any[];
}) {
    const topFive = topPlayers.slice(0, 30);
    const topNotFive = topPlayers.slice(5);
    return (
        <>
            {topPlayers.length > 0 && <Home items={topPlayers} year={year} sortBy={sortBy} direction={direction} /> || <p>There are no players for this year.</p>}
        </>
    );
}
