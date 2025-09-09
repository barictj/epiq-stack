import styles from '@components/TopFive/top_five.module.css';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import PlayerCard from '@components/PlayerCard/PlayerCard';

interface PlayerStat {
    id: string;
    name: string;
    player_image_url?: string;
    team?: string;
    position?: string;
    season_year: number;
    games_played: number;
    total_points: number;
    total_rebounds: number;
    total_assists: number;
    efficiency_possession_impact_quotient: number;
    seasonal_epiq: number;
    epiq_per_game: number;
    player: {}
}

interface TopFiveListProps {
    topFive: PlayerStat[];
}

export default function TopFiveListComponent({ topFive }: TopFiveListProps) {
    return (
        <Container fluid className={styles.topFiveContainer} >
            <Row fluid>
                <Col sm='5'>
                    <div className={styles.topPlayerCol}>
                        <h5>Current Leader</h5>
                        <PlayerCard item={topFive[0].player} yearStats={topFive[0]} />
                    </div>

                </Col>
                <Col className={styles.otherPlayersCol}>
                    {topFive.slice(1, 5).map((player, index) => {
                        const isTop = index === 0;
                        const pointsPerGame = (player.total_points / player.games_played).toFixed(1);
                        const reboundsPerGame = (player.total_rebounds / player.games_played).toFixed(1);
                        const assistsPerGame = (player.total_assists / player.games_played).toFixed(1);

                        return (

                            <div className={styles.playerRow}>
                                <div className={styles.rankCol}>#{index + 2}</div>

                                <div className={styles.avatarCol}>
                                    <img
                                        src={player.player.player_image_url || 'https://via.placeholder.com/60'}
                                        alt={player.player.name}
                                        className={styles.avatar}
                                    />
                                </div>

                                <div className={styles.nameCol}>
                                    <Link href={`/getByPlayer?id=${player.id}`} className={styles.name}>
                                        {player.player.name}
                                    </Link>
                                </div>

                                <div className={styles.statsCol}>
                                    <div className={styles.stats}>
                                        <span><strong>EPIQ:</strong> {player.efficiency_possession_impact_quotient.toFixed(2)}</span>
                                        <span><strong>Season:</strong> {player.seasonal_epiq.toFixed(1)}</span>
                                        <span><strong>Per Game:</strong> {player.epiq_per_game.toFixed(2)}</span>
                                        <span><strong>PPG:</strong> {pointsPerGame}</span>
                                        <span><strong>RPG:</strong> {reboundsPerGame}</span>
                                        <span><strong>APG:</strong> {assistsPerGame}</span>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </Col>
            </Row >
        </Container >
    )
}