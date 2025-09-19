import styles from '@components/TopFive/top_five.module.css';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import { teamColors } from '../../../utils/ColorMap/ColorMap';

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
    player: {
        id: string;
        name: string;
        player_image_url?: string;
        team?: string;
    };
}

interface TopFiveListProps {
    topFive: PlayerStat[];
}

export default function TopFiveListComponent({ topFive }: TopFiveListProps) {
    return (
        <Container fluid className={styles.topFiveContainer}>
            <Row>
                <h2 className={styles.curretLeader}>Current Leaders</h2>

                {topFive.slice(0, 3).map((player, i) => (
                    <Col
                        sm="4"
                        style={{ height: '100%', marginTop: 'auto' }}
                        className={styles.topPlayerColContainer}
                        key={player.player.id}
                    >
                        <div className={styles.topPlayerCol}>
                            <div className={styles.cardWrapper}>
                                <PlayerCard item={player.player} yearStats={player} />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row className={styles.listRow}>
                <Col className={styles.listContainer}>
                    {topFive.slice(3, 25).map((player, index) => {
                        const pointsPerGame = (player.total_points / player.games_played).toFixed(1);
                        const reboundsPerGame = (player.total_rebounds / player.games_played).toFixed(1);
                        const assistsPerGame = (player.total_assists / player.games_played).toFixed(1);

                        const teamKey = player.team?.toUpperCase() || player.player?.team?.toUpperCase() || 'UNK';
                        const isTOT = teamKey === 'TOT';
                        const isUnknown = teamKey === 'UNK';

                        const colors = isTOT || isUnknown
                            ? { bg: 'linear-gradient(145deg, #0a0a0f, #1a1a2b)', text: '#FFFFFF' }
                            : teamColors[teamKey] || { bg: '#ffffff', text: '#000000' };

                        return (
                            <div className={styles.playerRow} key={player.player.id} style={{ background: colors.bg, color: colors.text, borderRadius: '8px', border: `4px solid ${colors.border}` }}>
                                <div className={styles.rankCol} >#{index + 4}</div>

                                <div className={styles.avatarCol} style={{
                                    background: colors.bg, color: colors.text
                                }}>
                                    <img
                                        src={player.player.player_image_url || 'https://via.placeholder.com/60'}
                                        alt={player.player.name}
                                        className={styles.avatar}
                                    />
                                </div>

                                <div className={styles.nameCol} style={{
                                    background: colors.bg, color: colors.text
                                }}><div>
                                        <Link href={`/getByPlayer?id=${player.player.id}&league=${player.player.league}`} className={styles.name} style={{
                                            background: colors.bg, color: colors.text
                                        }}>
                                            {player.player.name}
                                        </Link>
                                    </div>
                                    <div className={styles.teamDiv}>
                                        <span>{player.team || player.player.team || 'N/A'}</span>
                                    </div>
                                    <div className={styles.teamDiv}>{player.position || player.player.position || 'N/A'}</div>
                                </div>

                                <div
                                    className={styles.statsCol}
                                    style={{ background: colors.bg, color: colors.text }}
                                >
                                    <div className={styles.stats} style={{
                                        background: colors.bg, color: colors.text
                                    }}>
                                        <span><strong>Games:</strong> {player.games_played}</span>
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
    );
}
