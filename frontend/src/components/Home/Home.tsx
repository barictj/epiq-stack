import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './main.module.css';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import HomepageHero from './HomePageHero/HomePageHero';
import TopPlayerList from '@components/TopPlayerList/TopPlayerList';
const TARGET_SEASON = 1978;

export default function Home({ items }: { items: any[] }) {
    return (
        <Container className={styles.mainContainer} fluid>
            <Row>
                <HomepageHero />
            </Row>
            <Row>
                <TopPlayerList topPlayers={items} />
            </Row>

            <Row fluid>
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
