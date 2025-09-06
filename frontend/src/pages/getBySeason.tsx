import Home from '@components/Home/Home';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../components/Home/main.module.css';
import { fetchAllStatsByYear } from '../components/serverApi';

export async function getServerSideProps(context: any) {
    const year = context.query.year || 1979;
    const items = await fetchAllStatsByYear(year);

    return { props: { items, year } };
}

export default function GetBySeason({ items, year }: { items: any[]; year: number }) {
    const minPossessions = 1000;
    const sortByEPIQ = true;
    items.forEach(({ player, yearStats }) => {
        const possessions = parseFloat(yearStats.possessions ?? "0");
    });
    let filteredAndSortedItems = [];
    if (Array.isArray(items)) {
        filteredAndSortedItems = items
            .filter(({ yearStats }) => {
                const possessions = parseFloat(yearStats.possessions ?? "0");
                return possessions > minPossessions;
            })
            .sort((a, b) => {
                if (!sortByEPIQ) return 0;
                return b.yearStats.epiq_per_game - a.yearStats.epiq_per_game;
            });
    }
    return (
        <Container className={styles.mainContainer} fluid>
            <Row>
                {filteredAndSortedItems.map(({ player, yearStats }) => (
                    <PlayerCard
                        key={`${player.id}-${yearStats.season_year}`}
                        item={player}
                        yearStats={yearStats}
                    />
                ))}
            </Row>
        </Container>
    )
}