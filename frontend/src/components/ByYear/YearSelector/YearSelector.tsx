'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './year_selector.module.css';

const START_YEAR = 1970;
const END_YEAR = new Date().getFullYear();

export default function YearSelector() {
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const years = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => END_YEAR - i);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Select a Season</h2>
            <div className={styles.grid}>
                {years.map((year) => (
                    <Link
                        key={year}
                        href={`/getBySeason?year=${year}&sortBy=seasonal_epiq&startAt=0&endBy=24&view=table`}
                        className={`${styles.link} ${selectedYear === year ? styles.selected : ''}`}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </Link>
                ))}
            </div>
        </div>
    );
}
