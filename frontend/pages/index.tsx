import React from 'react';
import PlayerCard from '@components/PlayerCard/PlayerCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export async function getServerSideProps() {
    const res = await fetch('http://backend:3001/api/items');
    const items = await res.json();

    return {
        props: { items },
    };
}

export default function Home({ items }: { items: any[] }) {
    console.log('mainpage    ' + items)
    return (
        <Container>
            {items.map((item) => (
                <>
                    <Row>
                        <Col xs={9} offset={4}> <PlayerCard player={item} /></Col>
                        <Col > <Container><PlayerCard player={item} /></Container></Col>
                    </Row>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                    </Row>
                </>
            ))}

        </Container>
    );
}
