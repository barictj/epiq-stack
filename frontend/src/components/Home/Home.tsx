import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './main.module.css';
import PlayerCard from '@components/PlayerCard/PlayerCard';

const TARGET_SEASON = 1978;

export default function Home({ items }: { items: any[] }) {
    return (
        <Container className={styles.mainContainer} fluid>
            <Row fluid>
                {items.length > 0 ? (
                    items.map((item) => {
                        // Flatten nested yearStats if present
                        const rawStats = Array.isArray(item.yearStats) ? item.yearStats : [item.yearStats];
                        const statsArray = rawStats.flatMap((s: any) =>
                            Array.isArray(s.yearStats) ? s.yearStats : [s]
                        );


                        const stat = statsArray.find((s) => s.season_year === TARGET_SEASON);

                        if (!stat || stat.games_played === 0) return null;

                        return (
                            <PlayerCard
                                key={`${item.id}-${stat.season_year}-${stat.total_points}`}
                                item={item}
                                yearStats={stat}
                            />
                        );
                    })
                ) : (
                    <p>No qualifying players found for {TARGET_SEASON}.</p>
                )}

                {/* Optional footer content */}
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most.</p>
                </Col>
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most!</p>
                </Col>
            </Row>
        </Container>
    );
}
