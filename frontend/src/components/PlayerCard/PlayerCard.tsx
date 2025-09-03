import Col from 'react-bootstrap/Col';
import styles from './playerCard.module.css';
export default function PlayerCard({ item }: { item: any }) {
    console.log(item.yearStats)


    let pointsPerGame = (item.yearStats[0].total_points / item.yearStats[0].games_played).toFixed(2);
    let reboundsPerGame = (item.yearStats[0].total_rebounds / item.yearStats[0].games_played).toFixed(2);
    let assistsPerGame = (item.yearStats[0].total_assists / item.yearStats[0].games_played).toFixed(2);

    return (
        <Col sm={6} lg={6} key={item.id}>
            <div className={styles.basketballCard}>
                <div className={styles.rarityBadge}>All-Star</div>

                <div className={styles.cardTop}>
                    <img
                        src={item.player_image_url || 'https://via.placeholder.com/150'}
                        alt={item.name}
                        className={styles.playerImage}
                    />
                    <h2 className={styles.playerName}>{item.name}</h2>
                </div>

                <div className={styles.cardStats}>
                    <div className={`${styles.stat} ${styles.epiqStat}`}>
                        <span>EPIQ Score</span><strong>{item.yearStats.efficiency_possession_impact_quotient}</strong>
                    </div>

                    <div className={styles.stat}><span>Points Per Game</span><strong>{parseFloat(pointsPerGame)}</strong></div>
                    <div className={styles.stat}><span>Rebounds Per Game</span><strong>{reboundsPerGame}</strong></div>
                    <div className={styles.stat}><span>Assists Per Game</span><strong>{assistsPerGame}</strong></div>

                </div>

                <div className={styles.cardFooter}>
                    <span className={styles.team}>{item.team || 'Denver Nuggets'}</span>
                    <span className={styles.position}>{item.position || 'Guard'}</span>
                </div>
            </div>
        </Col>
    )
}