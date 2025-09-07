import Home from '@components/Home/Home';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import PlayerStatsTable from '@components/PlayerPage/PlayerStatsTable/PlayerStatsTable';
import PlayerHeader from '@components/PlayerPage/PlayerHeader/PlayerHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../components/Home/main.module.css';
import { fetchItemSSR, fetchPlayerStatsByYear } from '../components/serverApi';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
export async function getServerSideProps(context: any) {
    const id = context.query.id;
    const item = await fetchItemSSR(id)
    const encrichedPlayer = await fetchPlayerStatsByYear(item.id);
    return {
        props: {
            encrichedPlayer
        }
    };
}
export default function getByPlayer({
    encrichedPlayer
}: {
    encrichedPlayer: any;
}) {
    return (
        <main style={{ backgroundColor: '#f0f2f5', paddingTop: '20px', minHeight: '100vh' }}>
            <Container>
                <PlayerHeader player={encrichedPlayer} />
                <PlayerStatsTable playerStats={encrichedPlayer.yearStats} />
            </Container>
        </main >
    )
}