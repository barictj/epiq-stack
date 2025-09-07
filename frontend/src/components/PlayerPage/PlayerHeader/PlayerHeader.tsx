import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './player_header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function PlayerHeader({ player }: { player: any }) {
    const encrichedPlayer = player;
    return (
        <>
            <Row className="justify-content-md-left-bottom">
                <Col md="auto">
                    <img
                        src={encrichedPlayer.player_image_url || 'https://via.placeholder.com/150'}
                        alt={encrichedPlayer.name}
                        className={styles.playerImage}
                    />
                </Col>
                <Col md="auto">
                    <h1 className={styles.pageTitle} key={encrichedPlayer.name}>Player: {encrichedPlayer.name}</h1>
                </Col>
            </Row>

        </>
    )
}