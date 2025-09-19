'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';


import styles from './by_year.module.css';

export default function TeamsBySeason({
    teams,
    direction,
    seasonSelector,
    year,
}: {
    teams: any[];
    direction: 'ASC' | 'DESC';
    seasonSelector: boolean;
    year: number;
}) {
    const searchParams = useSearchParams();
    const sortBy = searchParams.get('sortBy') ?? 'efficiency_possession_impact_quotient';
    const startAt = Number(searchParams.get('startAt') ?? 0);
    const endBy = Number(searchParams.get('endBy') ?? 24);
    const [view, setView] = useState<'table' | 'graphic'>('table');
    const initialView = searchParams.get('view') ?? 'table';
    useEffect(() => {
        if (seasonSelector) {
            setView(initialView === 'graphic' ? 'graphic' : 'table');
        } else {
            setView('graphic');
        }
    }, [initialView, seasonSelector]);
}