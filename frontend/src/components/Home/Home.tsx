import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './main.module.css';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import HomepageHero from './HomePageHero/HomePageHero';
import TopPlayerList from '@components/TopPlayerList/TopPlayerList';
import TopFive from '@components/TopFive/TopFive';
const TARGET_SEASON = 1978;

export default function Home({ items }: { items: any[] }) {

    const TopFivePlayers = items.slice(0, 5)
    const remainingPlayers = items.slice(5);
    return (
        <Container className={styles.mainContainer} fluid>
            <Row>
                <HomepageHero />
            </Row>
            <Row >
                <h2 className={styles.title}>🏆 Top 5 EPIQ Per Game Leaders</h2>
                <TopFive players={TopFivePlayers} />
            </Row>

            <Row fluid>
                <TopPlayerList topPlayers={remainingPlayers} />
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
