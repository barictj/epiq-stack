import Link from 'next/link';
import styles from './top_player_list.module.css';
import { teamColors } from '../../utils/ColorMap/ColorMap';

export default function TopPlayerList({
    topPlayers
}: {
    topPlayers: any[];
}) {
    return (
        <>
            {topPlayers && topPlayers.length > 0 && (
                <div style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px' }}>
                        {topPlayers.map((player) => {
                            const teamKey = player.team?.toUpperCase() || player.player?.team?.toUpperCase() || 'UNK';
                            const isTOT = teamKey === 'TOT';
                            const isUnknown = teamKey === 'UNK';

                            const colors = isTOT || isUnknown
                                ? { bg: 'linear-gradient(145deg, #0a0a0f, #1a1a2b)', text: '#FFFFFF' }
                                : teamColors[teamKey] || { bg: '#ffffff', text: '#000000' };

                            return (
                                <div
                                    key={player.id}
                                    style={{
                                        border: `4px solid ${colors.border}`,
                                        borderRadius: '8px',
                                        padding: '15px',
                                        width: '275px',
                                        background: colors.bg,
                                        color: colors.text,
                                        fontSize: '18px',
                                    }}
                                >
                                    <Link href={`/getByPlayer?id=${player.player.id}`} style={{ color: colors.text }}>
                                        <img
                                            src={player.player.player_image_url || 'https://via.placeholder.com/150'}
                                            alt={player.player.name}
                                            className={styles.playerImage}
                                            style={{ borderColor: colors.border }}
                                        />
                                        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                            {player?.player?.name}
                                        </div>
                                    </Link>

                                    <p style={{ margin: '5px 0' }}><strong>Season EPIQ:</strong> {player.seasonal_epiq}</p>
                                    <p style={{ margin: '5px 0' }}><strong>EPP</strong> (EPIQ Per Possession): {player.efficiency_possession_impact_quotient}</p>
                                    <p style={{ margin: '5px 0' }}><strong>EPG:</strong> (EPIQ Per Game): {player.epiq_per_game}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Total Points:</strong> {player.total_points}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Total Rebounds:</strong> {player.total_rebounds}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Total Assists:</strong> {player.total_assists}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
