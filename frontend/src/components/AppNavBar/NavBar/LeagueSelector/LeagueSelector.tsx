import { useState } from 'react';
import styles from './LeagueSelector.module.css';
import { useLeague } from '../../../../context/LeagueContext';

export default function LeagueSelector({
    onChange,
    initialLeague = 'NBA',
}: {
    onChange: (league: 'NBA' | 'WNBA') => void;
    initialLeague?: 'NBA' | 'WNBA';
}) {
    const { league, setLeague } = useLeague();
    const handleClick = (league: 'NBA' | 'WNBA') => {
        setLeague(league);
        onChange(league);
    };

    return (
        <div className={styles.navWrapper}>
            <div
                className={league === 'NBA' ? styles.active : styles.inactive}
                onClick={() => handleClick('NBA')}
            >
                Men's
            </div>
            <div
                className={league === 'WNBA' ? styles.active : styles.inactive}
                onClick={() => handleClick('WNBA')}
            >
                Women's
            </div>
        </div>
    );
}
