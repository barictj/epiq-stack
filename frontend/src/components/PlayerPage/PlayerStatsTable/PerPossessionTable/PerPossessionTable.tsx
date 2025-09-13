import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import styles from '../player_stats_table.module.css'


export default function PerPossessionTable({ stats }: { stats: any[] }) {


    return (
        <>
            <Table striped bordered hover responsive className={styles.statsTable}>
                <thead className={styles.tableHeader}>
                    <tr>
                        <th>Season Year</th>
                        <th>Games Played</th>
                        <th>EPIQ</th>
                        <th>Seasonal EPIQ</th>
                        <th>EPIQ Per Game</th>
                        <th>PTS </th>
                        <th>TRB</th>
                        <th>AST</th>
                        <th>FGA</th>
                        <th>FGM</th>
                        <th>FTA</th>
                        <th>FTM</th>
                        <th>3PA</th>
                        <th>3PM</th>
                        <th>TOV</th>
                    </tr>
                </thead>
                <tbody>

                    {stats.map((stat: any, index: number) => (
                        <tr key={`row-${stat.season_year}-${index}`}>
                            <td>
                                <Link href={`getBySeason?year=${stat.season_year}&sortBy=seasonal_epiq&startAt=0&endBy=24&view=table`}>{stat.season_year}</Link>
                            </td>
                            <td>{stat.games_played}</td>
                            <td>{stat.efficiency_possession_impact_quotient?.toFixed(1)}</td>
                            <td>{stat.seasonal_epiq?.toFixed(1)}</td>
                            <td>{stat.epiq_per_game?.toFixed(1)}</td>
                            <td>{stat.possessions ? (stat.total_points / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.total_rebounds / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.total_assists / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.field_goals_attempted / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.field_goals_made / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.free_throws_attempted / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.free_throws_made / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.three_points_attempted / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.three_points_made / stat.possessions).toFixed(1) : '—'}</td>
                            <td>{stat.possessions ? (stat.total_turnovers / stat.possessions).toFixed(1) : '—'}</td>


                        </tr>
                    ))}


                </tbody>
            </Table>

        </>
    )
} 