import { getAverageStatsBySeason, getAllAverageStatsBySeason } from '../components/serverApi';
import AverageByYearTable from '@components/AverageByYear/Table/AverageByYearTable';
export async function getServerSideProps(context: any) {
    const season_year = context.query.season_year
        ? parseInt(context.query.season_year, 10)
        : undefined;

    const averageStats = season_year
        ? await getAverageStatsBySeason(season_year)
        : await getAllAverageStatsBySeason();

    return {
        props: {
            averageStats
        }
    };
}
export default function getAverageBySeason({ averageStats }: { averageStats: any }) {
    return (
        <>
            <AverageByYearTable stats={averageStats} />
        </>
    );
}
