import Container from 'react-bootstrap/Container';
import TopFiveListComponent from './TopFiveListComponent/TopFiveListComponent';
import styles from './top_five.module.css';



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
}

interface TopFiveListProps {
    players: PlayerStat[];
}

export default function TopFive({ players }: TopFiveListProps) {
    if (!players || players.length === 0) return null;

    const topFive = players.slice(0, 5);
    console.log("🏆 Top Five Players:", topFive);
    return (
        <Container fluid>
            <TopFiveListComponent topFive={topFive} />
        </Container>
    );
}
