import { useState, useEffect } from 'react';
import styles from './LeagueSelector.module.css';
import { useLeague } from '../../../../context/LeagueContext';

export default function LeagueSelector({
    onChange,
    initialLeague,
}: {
    onChange: (league: 'NBA' | 'WNBA') => void;
    initialLeague?: 'NBA' | 'WNBA';
}) {
    const { league: contextLeague, setLeague } = useLeague();
    const [selectedLeague, setSelectedLeague] = useState<'NBA' | 'WNBA'>(initialLeague || contextLeague);

    useEffect(() => {
        // Sync context on mount
        setLeague(selectedLeague);
        onChange(selectedLeague);
    }, [selectedLeague]);

    const handleClick = (league: 'NBA' | 'WNBA') => {
        setSelectedLeague(league);
        setLeague(league);
        onChange(league);
    };

    return (
        <div className={styles.navWrapper}>
            <div
                className={selectedLeague === 'NBA' ? styles.active : styles.inactive}
                onClick={() => handleClick('NBA')}
            >
                Men's
            </div>
            <div
                className={selectedLeague === 'WNBA' ? styles.active : styles.inactive}
                onClick={() => handleClick('WNBA')}
            >
                Women's
            </div>
        </div>
    );
}
