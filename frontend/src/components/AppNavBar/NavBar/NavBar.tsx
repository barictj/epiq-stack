import Nav from 'react-bootstrap/Nav';
import LeagueSelector from './LeagueSelector/LeagueSelector';
import styles from './nav_bar.module.css'
import { useLeague } from '../../../context/LeagueContext';

export default function NavBar() {
    const { league, setLeague } = useLeague();

    const handleLeagueChange = (newLeague: 'NBA' | 'WNBA') => {
        setLeague(newLeague);
        console.log('Selected league:', newLeague); // ✅ logs correct value
    };

    return (
        <>
            <Nav className={`me-auto ${styles.navbar}`}>
                <LeagueSelector onChange={handleLeagueChange} initialLeague={league} />
                <Nav.Link href={`/getBySeason?league=${league}&year=1999&sortBy=seasonal_epiq&startAt=0&endBy=24&view=table`}>Leaders</Nav.Link>
                <Nav.Link href={`/getAverageBySeason?league=${league}`}>Averages</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </>
    );
}
