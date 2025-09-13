import TopPlayerList from '@components/TopPlayerList/TopPlayerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchTopPlayers } from '../components/serverApi';
import ByYearHome from '@components/ByYear/ByYearHome';

export async function getServerSideProps(context: any) {
    const {
        year = 1989,
        sortBy = 'seasonal_epiq',
        startAt = 0,
        endBy = 24,
        direction = 'DESC',
    } = context.query;
    const topPlayers = await fetchTopPlayers({
        year: Number(year),
        sortBy: String(sortBy),
        startAt: Number(startAt),
        endBy: Number(endBy),
        direction: String(direction),
    });

    return {
        props: {
            topPlayers,
            year: Number(year),
            sortBy: String(sortBy),
            direction: String(direction).toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        },
    };
}

export default function Index({
    topPlayers,
    year,
    sortBy,
    direction,
}: {
    topPlayers: any[];
    year: number;
    sortBy: string;
    direction: 'ASC' | 'DESC';
}) {
    return (
        <>
            <ByYearHome
                items={topPlayers}
                year={year}
                sortBy={sortBy}
                direction={direction}
            />
        </>
    );
}
