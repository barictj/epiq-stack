import styles from '../player_stats_table.module.css'
import Table from 'react-bootstrap/Table';
import Link from 'next/link';


export default function PlayerStatsTable({ stats }: { stats: any[] }) {
    return (
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
                    <th>Poss</th>
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
                        <td>{stat.efficiency_possession_impact_quotient}</td>
                        <td>{stat.seasonal_epiq}</td>
                        <td>{stat.epiq_per_game}</td>
                        <td>{stat.total_points}</td>
                        <td>{stat.total_rebounds}</td>
                        <td>{stat.total_assists}</td>
                        <td>{stat.field_goals_attempted}</td>
                        <td>{stat.field_goals_made}</td>
                        <td>{stat.free_throws_attempted}</td>
                        <td>{stat.free_throws_made}</td>
                        <td>{stat.three_points_attempted}</td>
                        <td>{stat.three_points_made}</td>
                        <td>{stat.possessions}</td>
                        <td>{stat.total_turnovers}</td>
                    </tr>
                ))}


            </tbody>
        </Table>
    )
}