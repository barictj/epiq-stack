import Home from '@components/Home/Home';
import PlayerCard from '@components/PlayerCard/PlayerCard';
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
    console.log('Fetching data for id:', id);
    const item = await fetchItemSSR(id)
    console.log('Fetched item:', item);
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
    console.log('Rendering page with :', encrichedPlayer);

    return (
        <main style={{ backgroundColor: '#f0f2f5', paddingTop: '20px', minHeight: '100vh' }}>
            <Container>
                <Row className="justify-content-md-left-bottom">
                    <Col md="auto">
                        <img
                            src={encrichedPlayer.player_image_url || 'https://via.placeholder.com/150'}
                            alt={encrichedPlayer.name}
                            className={styles.playerImage}
                        />
                    </Col>
                    <Col md="auto">
                        <h1 className={styles.pageTitle}>Player: {encrichedPlayer.name}</h1>
                    </Col>
                </Row>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Season Year</th>
                            <th>Games Played</th>
                            <th>EPIQ</th>
                            <th>Seasonal EPIQ</th>
                            <th>EPIQ Per Game</th>
                            <th>Total Points</th>
                            <th>Total Rebounds</th>
                            <th>Total Assists</th>
                            <th>Field Goals Attempted</th>
                            <th>Field Goals Made</th>
                            <th>Free Throws Attempted</th>
                            <th>Free Throws Made</th>
                            <th>Three Pointers Attempted</th>
                            <th>Three Pointers Made</th>
                        </tr>
                    </thead>
                    <tbody>

                        {encrichedPlayer.yearStats.map((stat: any, index: number) => (
                            <>
                                <tr>
                                    <td key={stat.season_year + stat.games_played + stat.season_year}>
                                        <Link href={`getBySeason?year=${stat.season_year}`}>{stat.season_year}</Link>
                                    </td>
                                    <td key={stat.games_played + stat.games_played + stat.season_year}>
                                        <>{stat.games_played}</>
                                    </td>
                                    <td key={stat.efficiency_possession_impact_quotient + stat.games_played + stat.season_year}>
                                        <>{stat.efficiency_possession_impact_quotient}</>
                                    </td>
                                    <td key={stat.seasonal_epiq + stat.games_played + stat.season_year}>
                                        <>{stat.seasonal_epiq}</>
                                    </td>
                                    <td key={stat.epiq_per_game + stat.games_played + stat.season_year}>
                                        <>{stat.epiq_per_game}</>
                                    </td>
                                    <td key={stat.total_points + stat.games_played + stat.season_year}>
                                        <>{stat.total_points}</>
                                    </td>
                                    <td key={stat.total_rebounds + stat.games_played + stat.season_year}>
                                        <>{stat.total_rebounds}</>
                                    </td>
                                    <td key={stat.total_assists + stat.games_played + stat.season_year}>
                                        <>{stat.total_assists}</>
                                    </td>
                                    <td key={stat.field_goals_attempted + stat.games_played + stat.season_year}>
                                        <>{stat.field_goals_attempted}</>
                                    </td>
                                    <td key={stat.field_goals_made + stat.games_played + stat.season_year}>
                                        <>{stat.field_goals_made}</>
                                    </td>
                                    <td key={stat.free_throws_attempted + stat.games_played + stat.season_year}>
                                        <>{stat.free_throws_attempted}</>
                                    </td>
                                    <td key={stat.free_throws_made + stat.games_played + stat.season_year}>
                                        <>{stat.free_throws_made}</>
                                    </td>
                                    <td key={stat.three_pointers_attempted + stat.games_played + stat.season_year}>
                                        <>{stat.three_pointers_attempted}</>
                                    </td>
                                    <td key={stat.three_pointers_made + stat.games_played + stat.season_year}>
                                        <>{stat.three_pointers_made}</>
                                    </td>
                                </tr >
                            </>
                        ))}

                    </tbody>
                </Table>

            </Container>
        </main >
    )
}