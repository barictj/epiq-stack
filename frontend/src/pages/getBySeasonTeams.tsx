import TopPlayerList from '@components/TopPlayerList/TopPlayerList';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchTopTeams } from '../components/serverApi';
import TeamsBySeason from '@components/TeamsBySeason/TeamsBySeason';

export async function getServerSideProps(context: any) {
    const {
        league = 'NBA',
        year = 1999,
        sortBy = 'seasonal_epiq',
        startAt = 0,
        endBy = 24,
        direction = 'DESC',
    } = context.query;

    const topTeams = await fetchTopTeams({
        league: String(league),

        year: Number(year),
        sortBy: String(sortBy),
        startAt: Number(startAt),
        endBy: Number(endBy),
        direction: String(direction),
    });
    console.log(context.query);
    return {
        props: {
            topTeams,
            year: Number(year),
            sortBy: String(sortBy),
            direction: String(direction).toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
            league: String(league),
        },
    };
}

export default function Index({
    topTeams,
    year,
    sortBy,
    direction,
    league
}: {
    topTeams: any[];
    year: number;
    sortBy: string;
    direction: 'ASC' | 'DESC';
    league: string;
}) {
    const searchParams = useSearchParams();
    const startAt = Number(searchParams.get('startAt') ?? 0);
    const endBy = Number(searchParams.get('endBy') ?? 24);
    const initialView = searchParams.get('view') ?? 'table';
    const [view, setView] = useState<'table' | 'graphic'>(
        initialView === 'graphic' ? 'graphic' : 'table'
    );
    const handleToggle = (newView: 'table' | 'graphic') => {
        setView(newView);
        // Optional: update router query if you want to reflect it in the URL
    };
    return (
        <>
            <h1>Top Teams for {year}</h1>
            {topTeams.length > 0 ? (
                <TeamsBySeason
                    teams={topTeams}
                    direction={direction}
                    seasonSelector={true}
                    year={year}
                    league={league}
                />
            ) : (
                <div className="alert alert-warning mt-3">
                    No team data available for {league} in {year}.
                </div>
            )}
        </>
    );

}
