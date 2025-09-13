'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Pagination from './Pagination/Pagination';
import ControlBar from './ControlBar/ControlBar';
import TableView from './Grid/TableView';
import YearSelector from './YearSelector/YearSelector';
import ViewToggle from './TableOrGraphic/ViewToggle';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import TopPlayerList from '@components/TopPlayerList/TopPlayerList';
import TopFive from '@components/TopFive/TopFive';

import styles from './by_year.module.css';

export default function ByYearHome({
    items,
    direction,
}: {
    items: any[];
    direction: 'ASC' | 'DESC';
}) {
    const searchParams = useSearchParams();

    const year = Number(searchParams.get('year') ?? 1989);
    const sortBy = searchParams.get('sortBy') ?? 'efficiency_possession_impact_quotient';
    const startAt = Number(searchParams.get('startAt') ?? 0);
    const endBy = Number(searchParams.get('endBy') ?? 24);
    const initialView = searchParams.get('view') ?? 'table';

    const [view, setView] = useState<'table' | 'graphic'>(
        initialView === 'graphic' ? 'graphic' : 'table'
    );

    const TopFivePlayers = items.slice(0, 5);
    const remainingPlayers = items.slice(5);

    const handleToggle = (newView: 'table' | 'graphic') => {
        setView(newView);
        // Optional: update router query if you want to reflect it in the URL
    };

    return (
        <Container className={styles.mainContainer} fluid>
            <Row>
                <YearSelector />
                <ControlBar />

                {view === 'graphic' ? (
                    <>
                        <Row>
                            <h2 className={styles.title}>
                                🏆 Top 5 EPIQ Per Game Leaders of {TopFivePlayers[0].season_year}/
                                {TopFivePlayers[0].season_year + 1}
                            </h2>
                            <TopFive players={TopFivePlayers} />
                        </Row>
                        <Row>
                            <TopPlayerList topPlayers={remainingPlayers} />
                            <Col>
                                <h1>✅ next</h1>
                                <p>Bubba, I love you the most.</p>
                            </Col>
                            <Col>
                                <h1>✅ next</h1>
                                <p>Bubba, I love you the most!</p>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <TableView
                        data={items}
                        year={year}
                        sortBy={sortBy}
                        direction={direction}
                    />
                )}
            </Row>
        </Container>
    );
}
