import { useState } from 'react';
import PerGameStatsTable from './PerGameStatsTable/PerGameStatsTable';
import PerPossessionTable from './PerPossessionTable/PerPossessionTable';
import TotalStatsTable from './TotalStatsTable/TotalStatsTable';
import styles from './player_stats_table.module.css';

export default function PlayerStatsTable({ playerStats }: { playerStats: any[] }) {
    const [selectedView, setSelectedView] = useState<'perGame' | 'perPossession' | 'total'>('perGame');

    const renderTable = () => {
        switch (selectedView) {
            case 'perGame':
                return <PerGameStatsTable stats={playerStats} />;
            case 'perPossession':
                return <PerPossessionTable stats={playerStats} />;
            case 'total':
                return <TotalStatsTable stats={playerStats} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.statsWrapper}>
            <div className={styles.selector}>
                <button
                    className={selectedView === 'perGame' ? styles.active : ''}
                    onClick={() => setSelectedView('perGame')}
                >
                    Per Game
                </button>
                <button
                    className={selectedView === 'perPossession' ? styles.active : ''}
                    onClick={() => setSelectedView('perPossession')}
                >
                    Per Possession
                </button>
                <button
                    className={selectedView === 'total' ? styles.active : ''}
                    onClick={() => setSelectedView('total')}
                >
                    Total
                </button>
            </div>

            <h4 className={styles.statHeaders}>
                {selectedView === 'perGame' && 'Per Game Stats'}
                {selectedView === 'perPossession' && 'Per Possession Stats'}
                {selectedView === 'total' && 'Total Stats'}
            </h4>

            {renderTable()}
        </div>
    );
}
