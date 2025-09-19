'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
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

export default function ControlBar({
    view,
    setView,
}: {
    view: 'table' | 'graphic';
    setView: (v: 'table' | 'graphic') => void;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const league = searchParams.get('league') || 'NBA'; // fallback to NBA if missing

    const year = Number(searchParams.get('year') ?? 1989);
    const sortBy = searchParams.get('sortBy') ?? 'seasonal_epiq';
    const startAt = Number(searchParams.get('startAt') ?? 0);
    const endBy = Number(searchParams.get('endBy') ?? 24);
    const pageSize = endBy - startAt + 1;

    const nextStart = startAt + pageSize;
    const nextEnd = nextStart + pageSize - 1;
    const prevStart = Math.max(0, startAt - pageSize);
    const prevEnd = prevStart + pageSize - 1;

    const buildQuery = (params: Record<string, string | number>) =>
        `${pathname}?${new URLSearchParams(params).toString()}`;
    return (
        <div className={styles.controlBar}>
            {/* View Selector */}
            <div className={styles.selectorGroup}>

                <span
                    className={`${styles.link} ${view === 'table' ? styles.active : ''
                        } `}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        setView('table');
                        // router.push(buildQuery({ year, sortBy, startAt, endBy }));
                    }}
                >
                    Table
                </span>
                <span
                    className={`${styles.link} ${view === 'graphic' ? styles.active : ''} `}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        setView('graphic');
                        // router.push(buildQuery({ year, sortBy, startAt, endBy }));
                    }}
                >
                    Graphic
                </span>
            </div>

            {/* Sort Selector */}
            <div className={styles.selectorGroup}>
                <span>Sort By:</span>
                <select
                    className={styles.dropdown}
                    value={sortBy}
                    onChange={(e) => {
                        const newSort = e.target.value;
                        router.push(buildQuery({ year, sortBy: newSort, startAt, endBy, league }));
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
                        <span
                            key={size}
                            className={`${styles.link} ${pageSize === size ? styles.active : ''} `}
                            role="button"
                            tabIndex={0}
                            onClick={() => router.push(buildQuery({ year, sortBy, startAt, endBy: newEnd }))}
                        >
                            {size}
                        </span>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className={styles.paginationGroup}>
                {startAt > 0 && (
                    <span
                        className={styles.link}
                        role="button"
                        tabIndex={0}
                        onClick={() => router.push(buildQuery({ year, sortBy, startAt: prevStart, endBy: prevEnd }))}
                    >
                        ◀ Prev
                    </span>
                )}
                <span className={styles.pageInfo}>
                    {startAt + 1}–{endBy + 1}
                </span>
                <span
                    className={styles.link}
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(buildQuery({ year, sortBy, startAt: nextStart, endBy: nextEnd }))}
                >
                    Next ▶
                </span>
            </div>
        </div>
    );
}
