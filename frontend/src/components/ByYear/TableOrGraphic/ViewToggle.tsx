'use client';

import styles from './ViewToggle.module.css';

interface Props {
    currentView: 'table' | 'grid';
    onToggle: (view: 'table' | 'grid') => void;
}

export default function ViewToggle({ currentView, onToggle }: Props) {
    return (
        <div className={styles.toggleContainer}>
            <button
                className={`${styles.toggleButton} ${currentView === 'table' ? styles.active : ''}`}
                onClick={() => onToggle('table')}
            >
                📊 Table
            </button>
            <button
                className={`${styles.toggleButton} ${currentView === 'grid' ? styles.active : ''}`}
                onClick={() => onToggle('graphic')}
            >
                🟦 Graphic
            </button>
        </div>
    );
}
