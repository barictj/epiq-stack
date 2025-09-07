import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import styles from './player_stats_table.module.css';


export default function PlayerStatsTable({ playerStats }: { playerStats: any[] }) {
    const yearStats = playerStats;

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Season Year</th>
                        <th>Games Played</th>
                        <th>EPIQ</th>
                        <th>Seasonal EPIQ</th>
                        <th>EPIQ Per Game</th>
                        <th>Total Points</th>
                        <th>Total Rebounds</th>
                        <th>Total Assists</th>
                        <th>Field Goals Attempted</th>
                        <th>Field Goals Made</th>
                        <th>Free Throws Attempted</th>
                        <th>Free Throws Made</th>
                        <th>Three Pointers Attempted</th>
                        <th>Three Pointers Made</th>
                    </tr>
                </thead>
                <tbody>

                    {yearStats.map((stat: any, index: number) => (
                        <tr key={`row-${stat.season_year}-${index}`}>
                            <td>
                                <Link href={`getBySeason?year=${stat.season_year}`}>{stat.season_year}</Link>
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
                        </tr>
                    ))}


                </tbody>
            </Table>

        </>
    )
} 