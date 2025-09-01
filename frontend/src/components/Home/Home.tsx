import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import styles from './main.module.css';

export default function Home({ items }: { items: any[] }) {
    return (
        <Container className={styles.mainContainer} >
            <Row>


                {items && items.length > 0 ? (
                    <>
                        {items.map((item) => (
                            <Col sm={3} lg={6} key={item.id}>
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
                                            <span>EPIQ Score</span><strong>{item.all_time_epiq}</strong>
                                        </div>

                                        <div className={styles.stat}><span>Points Per Game</span><strong>{item.all_time_points_per_game}</strong></div>
                                        <div className={styles.stat}><span>Rebounds Per Game</span><strong>{item.all_time_rebounds_per_game}</strong></div>
                                        <div className={styles.stat}><span>Assists Per Game</span><strong>{item.all_time_assists_per_game}</strong></div>

                                    </div>

                                    <div className={styles.cardFooter}>
                                        <span className={styles.team}>{item.team || 'Denver Nuggets'}</span>
                                        <span className={styles.position}>{item.position || 'Guard'}</span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </>
                ) : (
                    <p>No items found.</p>
                )}
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most.</p>
                </Col>
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most!</p>
                </Col>

            </Row>



        </ Container >
    )
}

