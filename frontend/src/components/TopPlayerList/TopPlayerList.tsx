import Link from 'next/link';

import styles from './top_player_list.module.css';

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
                        {topPlayers.map((player) => (
                            <div key={player.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '275px', backgroundColor: '#fff' }}>

                                <Link href={`/getByPlayer?id=${player.player.id}`}><img
                                    src={player.player.player_image_url || 'https://via.placeholder.com/150'}
                                    alt={player.player.name}
                                    className={styles.playerImage}
                                />
                                    <div>{player?.player?.name}</div>
                                </Link>

                                <p style={{ margin: '5px 0' }}><strong>Season EPIQ:</strong> {player.seasonal_epiq}</p>
                                <p style={{ margin: '5px 0' }}><strong>EPP</strong> (Epic Per Possession): {player.efficiency_possession_impact_quotient}</p>
                                <p style={{ margin: '5px 0' }}><strong>EPG:</strong> (Epic Per Game):{player.epiq_per_game}</p>
                                <p style={{ margin: '5px 0' }}><strong>Total Points:</strong> {player.total_points}</p>
                                <p style={{ margin: '5px 0' }}><strong>Total Rebounds:</strong> {player.total_rebounds}</p>
                                <p style={{ margin: '5px 0' }}><strong>Total Assists:</strong> {player.total_assists}</p>

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}