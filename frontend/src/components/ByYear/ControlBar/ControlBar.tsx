'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './ControlBar.module.css';

const SORT_LABELS: Record<string, string> = {
    seasonal_epiq: 'Seasonal EPIQ',
    epiq_per_game: 'EPIQ Per Game',
    efficiency_possession_impact_quotient: 'Efficiency Possession Impact Quotient',
    total_points: 'Total Points',
    total_rebounds: 'Total Rebounds',
    total_assists: 'Total Assists',
    total_steals: 'Total Steals',
    total_blocks: 'Total Blocks',
    total_turnovers: 'Total Turnovers',
    total_fouls: 'Total Fouls',
    games_played: 'Games Played',
    possessions: 'Possessions',
    field_goals_made: 'Field Goals Made',
    field_goals_attempted: 'Field Goals Attempted',
    free_throws_made: 'Free Throws Made',
    free_throws_attempted: 'Free Throws Attempted',
    three_points_made: 'Three-Point Shots Made',
    three_points_attempted: 'Three-Point Shots Attempted',
    offensive_rebounds: 'Offensive Rebounds',
    defensive_rebounds: 'Defensive Rebounds',
};


export default function ControlBar() {
    const searchParams = useSearchParams();

    const year = Number(searchParams.get('year') ?? 1989);
    const sortBy = searchParams.get('sortBy') ?? 'seasonal_epiq';
    const startAt = Number(searchParams.get('startAt') ?? 0);
    const endBy = Number(searchParams.get('endBy') ?? 24);
    const view = searchParams.get('view') ?? 'table';
    const pageSize = endBy - startAt + 1;

    const nextStart = startAt + pageSize;
    const nextEnd = nextStart + pageSize - 1;
    const prevStart = Math.max(0, startAt - pageSize);
    const prevEnd = prevStart + pageSize - 1;

    const buildQuery = (params: Record<string, string | number>) =>
        `/getBySeason?${new URLSearchParams(params).toString()}`;

    return (
        <div className={styles.controlBar}>
            {/* View Selector */}
            <div className={styles.selectorGroup}>
                <span>View:</span>
                <Link
                    href={buildQuery({ year, sortBy, startAt, endBy, view: 'table' })}
                    className={`${styles.link} ${view === 'table' ? styles.active : ''}`}
                >
                    Table
                </Link>
                <Link
                    href={buildQuery({ year, sortBy, startAt, endBy, view: 'graphic' })}
                    className={`${styles.link} ${view === 'graphic' ? styles.active : ''}`}
                >
                    Graphic
                </Link>
            </div>

            {/* Sort Selector */}
            <div className={styles.selectorGroup}>
                <span>Sort By:</span>
                <select
                    className={styles.dropdown}
                    value={sortBy}
                    onChange={(e) => {
                        const newSort = e.target.value;
                        window.location.href = buildQuery({ year, sortBy: newSort, startAt, endBy, view });
                    }}
                >
                    {Object.entries(SORT_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Page Size Selector */}
            <div className={styles.selectorGroup}>
                <span>Page Size:</span>
                {[25, 50, 100].map((size) => {
                    const newEnd = startAt + size - 1;
                    return (
                        <Link
                            key={size}
                            href={buildQuery({ year, sortBy, startAt, endBy: newEnd, view })}
                            className={`${styles.link} ${pageSize === size ? styles.active : ''}`}
                        >
                            {size}
                        </Link>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className={styles.paginationGroup}>
                {startAt > 0 && (
                    <Link
                        href={buildQuery({ year, sortBy, startAt: prevStart, endBy: prevEnd, view })}
                        className={styles.link}
                    >
                        ◀ Prev
                    </Link>
                )}
                <span className={styles.pageInfo}>
                    {startAt + 1}–{endBy + 1}
                </span>
                <Link
                    href={buildQuery({ year, sortBy, startAt: nextStart, endBy: nextEnd, view })}
                    className={styles.link}
                >
                    Next ▶
                </Link>
            </div>
        </div>
    );
}
