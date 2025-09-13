import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './player_header.module.css';
import { teamColors } from '../../../utils/ColorMap/ColorMap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function PlayerHeader({ player }: { player: any }) {
    const encrichedPlayer = player;

    const length = encrichedPlayer.yearStats ? encrichedPlayer.yearStats.length - 1 : 0;
    if (encrichedPlayer.yearStats && encrichedPlayer.yearStats.length > 0) {
        encrichedPlayer.team = encrichedPlayer.yearStats[length].team;
        encrichedPlayer.position = encrichedPlayer.yearStats[0].position;
    }
    // const teamKey = encrichedPlayer.team ? encrichedPlayer.team : 'UNK';
    // const colors = teamColors[teamKey]
    const teamKey = player.team?.toUpperCase() || player.player?.team?.toUpperCase() || 'UNK';
    const isTOT = teamKey === 'TOT';
    const isUnknown = teamKey === 'UNK';
    const colors = isTOT || isUnknown
        ? { bg: 'linear-gradient(145deg, #0a0a0f, #1a1a2b)', text: '#FFFFFF' }
        : teamColors[teamKey] || { bg: '#ffffff', text: '#000000' };
    console.log('colors', colors);
    return (
        <>
            <Row className={styles.headerRow} style={{ color: colors.text, background: colors.bg, border: `4px solid ${colors.border}` }} >
                <Col md="auto">
                    <img
                        src={encrichedPlayer.player_image_url || 'https://via.placeholder.com/150'}
                        alt={encrichedPlayer.name}
                        className={styles.playerImage}
                        style={{ color: colors.text, background: colors.bg }}
                    />
                </Col>
                <Col md="auto">
                    <h1 style={{ color: colors.text, background: colors.bg }} className={styles.pageTitle}>{encrichedPlayer.name}</h1>
                    <h3 style={{ color: colors.text, background: colors.bg }} className={styles.subTitle}>{encrichedPlayer.position} | {encrichedPlayer.team}</h3>
                    <h5 className={styles.careerSummary} style={{ color: colors.text, background: colors.bg }} >

                        {encrichedPlayer.total_points_all_time} PTS • {encrichedPlayer.seasons_played} Seasons • EPIQ {encrichedPlayer.career_epiq}
                    </h5>
                </Col>
                <Col md='6' className={styles.statsRight} style={{ color: colors.text, background: colors.bg }}>
                    <>
                        <div className={styles.statsDiv}>
                            PPG
                        </div>
                    </>
                </Col>
            </Row>


        </>
    )
}