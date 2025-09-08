import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import TotalStatsTable from './TotalStatsTable/TotalStatsTable';
import PerGameStatsTable from './PerGameStatsTable/PerGameStatsTable';
import PerPossessionTable from './PerPossessionTable/PerPossessionTable';
import styles from './player_stats_table.module.css';


export default function PlayerStatsTable({ playerStats }: { playerStats: any[] }) {
    const yearStats = playerStats;

    return (
        <>

            <h4 className={styles.statHeaders}>Per Game Stats</h4>
            <PerGameStatsTable stats={yearStats} />
            <h4 className={styles.statHeaders}>Per Possession Stats</h4>
            <PerPossessionTable stats={yearStats} />

            <h4 className={styles.statHeaders}>Total Stats</h4>
            <TotalStatsTable stats={yearStats} />


        </>
    )
} 