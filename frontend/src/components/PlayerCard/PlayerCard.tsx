import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PlayerCard({ player }: { player: any }) {
    console.log('player data ' + player)
    return (
        <>
            <h2>{player.name}</h2>
            <div>{player.all_time_points_per_game}</div>

        </>
    );
}
export { PlayerCard };