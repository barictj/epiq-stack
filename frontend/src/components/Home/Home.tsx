import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import styles from './main.module.css';
import PlayerCard from '@components/PlayerCard/PlayerCard';
export default function Home({ items }: { items: any[] }) {
    return (
        <Container className={styles.mainContainer} >
            <Row>
                {items && items.length > 0 ? (
                    <>
                        {items.map((item) => (
                            <>
                                <PlayerCard item={item} />
                            </>
                        ))}
                    </>
                ) : (
                    <p>No items found.</p>
                )}
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most.</p>
                </Col>
                <Col>
                    <h1>✅ next</h1>
                    <p>Bubba, I love you the most!</p>
                </Col>
            </Row>
        </ Container >
    )
}

