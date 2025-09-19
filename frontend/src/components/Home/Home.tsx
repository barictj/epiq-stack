import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './main.module.css';
import HomepageHero from './HomePageHero/HomePageHero';

import EpiqExplainer from './HomePageExplainer/EpiqExplainer';
import ByYearHome from '@components/ByYear/ByYearHome';

export default function Home({ items, year, sortBy, direction }: { items: any[], year: number, sortBy: string, direction: string }) {
    const searchParams = useSearchParams();
    const initialView = searchParams.get('view') ?? 'table';
    const [view, setView] = useState<'table' | 'graphic'>(
        initialView === 'graphic' ? 'graphic' : 'table'
    );
    const handleToggle = (newView: 'table' | 'graphic') => {
        setView(newView);
        // Optional: update router query if you want to reflect it in the URL
    };
    return (
        <Container className={styles.mainContainer} fluid>
            <Row>
                <HomepageHero />
                <EpiqExplainer />
                <ByYearHome
                    view={view}
                    setView={setView}
                    items={items}
                    sortBy={sortBy}
                    direction={direction}
                    seasonSelector={false}
                    year={year}
                />
            </Row>


            <Row>
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most.</p>
                </Col>
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most!</p>
                </Col>
            </Row>
        </Container>
    );
}
