import Col from 'react-bootstrap/Col';
import styles from './playerCard.module.css';
import Link from 'next/link';
interface PlayerCardProps {
    item: any;
    yearStats: any;
}

export default function PlayerCard({ item, yearStats }: PlayerCardProps) {
    if (!yearStats || yearStats.games_played === 0) return null;
    const stats = yearStats;
    const pointsPerGame = (stats.total_points / stats.games_played).toFixed(2);
    const reboundsPerGame = (stats.total_rebounds / stats.games_played).toFixed(2);
    const assistsPerGame = (stats.total_assists / stats.games_played).toFixed(2);

    return (
        <Col sm={4} lg={4} key={item.id}>
            <div className={styles.basketballCard}>
                <div className={styles.rarityBadge}>
                    {stats.season_year} / {stats.season_year + 1}
                </div>

                <div className={styles.cardTop}>
                    <img
                        src={item.player_image_url || 'https://via.placeholder.com/150'}
                        alt={item.name}
                        className={styles.playerImage}
                    />
                    <h2 className={styles.playerName}>
                        <Link href={`/getByPlayer?id=${item.id}`}>{item.name}</Link>
                    </h2>
                </div>

                <div className={styles.cardStats}>
                    <div className={`${styles.stat} ${styles.epiqStat}`}>
                        <span>EPIQ Score</span>
                        <strong>{stats.efficiency_possession_impact_quotient}</strong>
                    </div>
                    <div className={styles.stat}>
                        <span>Season EPIQ Total</span>
                        <strong>{stats.seasonal_epiq}</strong>
                    </div>
                    <div className={styles.stat}>
                        <span>EPIQ Per Game</span>
                        <strong>{stats.epiq_per_game}</strong>
                    </div>
                    <div className={styles.stat}>
                        <span>Points Per Game</span>
                        <strong>{pointsPerGame}</strong>
                    </div>
                    <div className={styles.stat}>
                        <span>Rebounds Per Game</span>
                        <strong>{reboundsPerGame}</strong>
                    </div>
                    <div className={styles.stat}>
                        <span>Assists Per Game</span>
                        <strong>{assistsPerGame}</strong>
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    <span className={styles.team}>{item.team || 'Denver Nuggets'}</span>
                    <span className={styles.position}>{item.position || 'Guard'}</span>
                </div>
            </div>
        </Col>
    );
}
