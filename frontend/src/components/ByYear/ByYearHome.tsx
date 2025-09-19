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
    seasonSelector,
    year,
}: {
    items: any[];
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
    }, [seasonSelector, initialView]);


    const TopFivePlayers = items.slice(0, 5);
    const remainingPlayers = items.slice(5);

    // const handleToggle = (newView: 'table' | 'graphic') => {
    //     console.log('Toggling view to:', newView);
    //     setView(newView);
    //     // Optional: update router query if you want to reflect it in the URL
    // };

    return (
        <Container className={styles.mainContainer} fluid>
            <Row>
                {seasonSelector && <YearSelector view={view} />}
                <ControlBar view={view} setView={setView} />
                {view === 'graphic' ? (
                    <>
                        <Row>
                            <h2 className={styles.title}>
                                Leaders of the {TopFivePlayers[0].season_year} / {TopFivePlayers[0].season_year + 1} Season
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

                    <>
                        <h1></h1>
                        <TableView
                            data={items}
                            year={year}
                            sortBy={sortBy}
                            direction={direction}
                        />
                    </>
                )}
            </Row>
        </Container>
    );
}
