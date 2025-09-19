import PlayerStatsTable from '@components/PlayerPage/PlayerStatsTable/PlayerStatsTable';
import PlayerHeader from '@components/PlayerPage/PlayerHeader/PlayerHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import { fetchItemSSR, fetchPlayerStatsByYear } from '../components/serverApi';

export async function getServerSideProps(context: any) {
    const id = context.query.id;
    const league = context.query.league;
    console.log(context.query)
    const item = await fetchItemSSR(id, league)
    const encrichedPlayer = await fetchPlayerStatsByYear(item.id, league);
    console.log(league)
    return {
        props: {
            item,
            league
        }
    };

}
export default function getByPlayer({
    item
}: {
    item: any;
}) {
    console.log(item)
    return (
        <main style={{ backgroundColor: '#f0f2f5', paddingTop: '20px', minHeight: '100vh' }}>
            <Container>
                <PlayerHeader player={item} />
                <PlayerStatsTable playerStats={[...item.yearStats].reverse()} />
            </Container>
        </main >
    )
}