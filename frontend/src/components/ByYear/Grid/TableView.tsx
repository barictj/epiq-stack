'use client';

import { useRouter } from 'next/router';
import styles from './TableView.module.css';

interface Player {
    id: string;
    name: string;
    player_image_url?: string;
    position?: string;
    team?: string;
}

interface PlayerStats {
    id: string;
    games_played: number;
    possessions: number;
    epiq_per_game: number;
    seasonal_epiq: number;
    efficiency_possession_impact_quotient: number;
    field_goals_made: number;
    field_goals_attempted: number;
    free_throws_made: number;
    free_throws_attempted: number;
    three_points_made: number;
    three_points_attempted: number;
    total_points: number;
    total_rebounds: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    total_assists: number;
    total_steals: number;
    total_blocks: number;
    total_turnovers: number;
    total_fouls: number;
    player: Player;
    team: string;
}

export default function TableView({
    data,
    year,
    sortBy,
    direction,
}: {
    data: PlayerStats[];
    year: number;
    sortBy: string;
    direction: 'ASC' | 'DESC';
}) {
    const router = useRouter();

    const handleSortClick = (field: string) => {
        const isActive = sortBy === field;
        const nextDirection = isActive
            ? direction === 'DESC' ? 'ASC' : 'DESC'
            : 'DESC'; // default to DESC on first click

        router.push({
            pathname: '/getBySeason',
            query: {
                year,
                sortBy: field,
                direction: nextDirection,
                startAt: 0,
                endBy: 24,
                view: 'table',
            },
        });
    };

    const renderSortableHeader = (label: string, field: string) => (
        <th>
            <span
                onClick={() => handleSortClick(field)}
                className={styles.thLink}
                role="button"
                tabIndex={0}
            >
                {label}
            </span>
        </th>
    );

    return (
        <div className={styles.tableContainer}>
            <table className={styles.statsTable}>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Team</th>
                        {renderSortableHeader('Games Played', 'games_played')}
                        {renderSortableHeader('Possessions', 'possessions')}
                        {renderSortableHeader('EPIQ/Game', 'epiq_per_game')}
                        {renderSortableHeader('Seasonal EPIQ', 'seasonal_epiq')}
                        {renderSortableHeader('Quotient', 'efficiency_possession_impact_quotient')}
                        {renderSortableHeader('Field Goals Made', 'field_goals_made')}
                        {renderSortableHeader('Field Goals Attempted', 'field_goals_attempted')}
                        {renderSortableHeader('Free Throws Made', 'free_throws_made')}
                        {renderSortableHeader('Free Throws Attempted', 'free_throws_attempted')}
                        {renderSortableHeader('Three Points Made', 'three_points_made')}
                        {renderSortableHeader('Three Points Attempted', 'three_points_attempted')}
                        {renderSortableHeader('Total Points', 'total_points')}
                        {renderSortableHeader('Total Rebounds', 'total_rebounds')}
                        {renderSortableHeader('Offensive Rebounds', 'offensive_rebounds')}
                        {renderSortableHeader('Defensive Rebounds', 'defensive_rebounds')}
                        {renderSortableHeader('Total Assists', 'total_assists')}
                        {renderSortableHeader('Total Steals', 'total_steals')}
                        {renderSortableHeader('Total Blocks', 'total_blocks')}
                        {renderSortableHeader('Total Turnovers', 'total_turnovers')}
                        {renderSortableHeader('Total Fouls', 'total_fouls')}
                    </tr>
                </thead>
                <tbody>
                    {data.map((p) => (
                        <tr key={p.id}>
                            <td>
                                <a href={`/getByPlayer?id=${p.player.id}`} className={styles.playerLink}>
                                    {p.player.name}
                                </a>
                            </td>
                            <td>{p.team}</td>
                            <td>{p.games_played}</td>
                            <td>{p.possessions.toFixed(1)}</td>
                            <td>{p.epiq_per_game.toFixed(2)}</td>
                            <td>{p.seasonal_epiq.toFixed(1)}</td>
                            <td>{p.efficiency_possession_impact_quotient.toFixed(3)}</td>
                            <td>{p.field_goals_made}</td>
                            <td>{p.field_goals_attempted}</td>
                            <td>{p.free_throws_made}</td>
                            <td>{p.free_throws_attempted}</td>
                            <td>{p.three_points_made}</td>
                            <td>{p.three_points_attempted}</td>
                            <td>{p.total_points}</td>
                            <td>{p.total_rebounds}</td>
                            <td>{p.offensive_rebounds}</td>
                            <td>{p.defensive_rebounds}</td>
                            <td>{p.total_assists}</td>
                            <td>{p.total_steals}</td>
                            <td>{p.total_blocks}</td>
                            <td>{p.total_turnovers}</td>
                            <td>{p.total_fouls}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
