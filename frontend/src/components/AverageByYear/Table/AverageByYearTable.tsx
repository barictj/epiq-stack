import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import styles from './average_by_year.module.css'

export default function AverageByYearTable({ stats }: { stats: any[] }) {
    return (
        <Table striped bordered hover responsive className={styles.statsTable}>
            <thead className={styles.tableHeader}>
                <tr>
                    <th>Year</th>
                    <th>Games Played</th>
                    <th>Seasonal EPIQ</th>
                    <th>EPIQ Per Game</th>
                    <th>EPIQ</th>
                    <th>PTS </th>
                    <th>TRB</th>
                    <th>AST</th>
                    <th>FGA</th>
                    <th>FGM</th>
                    <th>FTA</th>
                    <th>FTM</th>
                    <th>3PA</th>
                    <th>3PM</th>
                    <th>Poss Per Game</th>
                    <th>TOV</th>
                </tr>
            </thead>
            <tbody>

                {stats.map((stat: any, index: number) => (
                    <tr key={`row-${stat.season_year}-${index}`}>
                        <td>
                            <Link href={`getBySeason?year=${stat.season_year}`}>{stat.season_year}</Link>
                        </td>
                        <td>{stat.games_played}</td>
                        <td>{stat.seasonal_epiq}</td>
                        <td>{stat.epiq_per_game}</td>
                        <td>{stat.efficiency_possession_impact_quotient}</td>
                        <td>{(stat.total_points / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.total_rebounds / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.total_assists / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.field_goals_attempted / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.field_goals_made / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.free_throws_attempted / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.free_throws_made / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.three_points_attempted / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.three_points_made / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.possessions / stat.games_played).toFixed(1)}</td>
                        <td>{(stat.total_turnovers / stat.games_played).toFixed(1)}</td>

                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
