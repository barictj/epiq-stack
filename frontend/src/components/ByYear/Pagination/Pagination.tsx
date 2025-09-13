'use client';

import { useRouter } from 'next/router';
import styles from './Pagination.module.css';

interface Props {
    year: number;
    sortBy: string;
    startAt: number;
    endBy: number;
    pageSize?: number;
}

export default function Pagination({
    year,
    sortBy,
    startAt,
    endBy,
    pageSize = 25,
}: Props) {
    const router = useRouter();

    const handlePageChange = (direction: 'next' | 'prev') => {
        const newStart = direction === 'next' ? startAt + pageSize : Math.max(0, startAt - pageSize);
        const newEnd = newStart + pageSize - 1;

        router.push({
            pathname: '/getBySeason',
            query: {
                year,
                sortBy,
                startAt: newStart,
                endBy: newEnd,
            },
        });
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageButton}
                onClick={() => handlePageChange('prev')}
                disabled={startAt === 0}
            >
                ◀ Prev
            </button>
            <span className={styles.pageInfo}>
                Showing {startAt + 1}–{endBy + 1}
            </span>
            <button className={styles.pageButton} onClick={() => handlePageChange('next')}>
                Next ▶
            </button>
        </div>
    );
}
