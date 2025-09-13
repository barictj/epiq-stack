import Col from 'react-bootstrap/Col';
import styles from './playerCard.module.css';
import Link from 'next/link';
import { teamColors } from '../../utils/ColorMap/ColorMap';

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

    // Normalize team key
    const teamKey = stats.team?.toUpperCase() || 'UNK';
    const isTOT = teamKey === 'TOT' || item.team?.toUpperCase() === 'TOT';
    const isUnknown = teamKey === 'UNK';

    // Resolve colors
    const colors = isTOT || isUnknown
        ? { bg: 'linear-gradient(145deg, #0a0a0f, #1a1a2b)', text: '#FFFFFF' }
        : teamColors[teamKey] || { bg: '#f0f0f0', text: '#333' };

    return (
        <div
            className={styles.basketballCard}
            key={stats.season_year + item.id}
            style={{ background: colors.bg, color: colors.text }}
        >
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
                    <Link href={`/getByPlayer?id=${item.id}`} style={{ color: colors.text }}>
                        {item.name}
                    </Link>
                </h2>
            </div>

            <div className={styles.cardStats}>
                <div className={`${styles.stat} ${styles.epiqStat}`}>
                    <span>EPIQ Score</span>
                    <strong style={{ color: colors.text }}>{stats.efficiency_possession_impact_quotient}</strong>
                </div>
                <div className={styles.stat}>
                    <span>Season EPIQ Total</span>
                    <strong style={{ color: colors.text }}>{stats.seasonal_epiq}</strong>
                </div>
                <div className={styles.stat}>
                    <span>EPIQ Per Game</span>
                    <strong style={{ color: colors.text }}>{stats.epiq_per_game}</strong>
                </div>
                <div className={styles.stat}>
                    <span>Points Per Game</span>
                    <strong style={{ color: colors.text }}>{pointsPerGame}</strong>
                </div>
                <div className={styles.stat}>
                    <span>Rebounds Per Game</span>
                    <strong style={{ color: colors.text }}>{reboundsPerGame}</strong>
                </div>
                <div className={styles.stat}>
                    <span>Assists Per Game</span>
                    <strong style={{ color: colors.text }}>{assistsPerGame}</strong>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.team}>{yearStats.team || 'NA'}</span>
                <span className={styles.position}>{yearStats.position || 'Guard'}</span>
            </div>
        </div>
    );
}
