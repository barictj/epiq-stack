import Nav from 'react-bootstrap/Nav';
import styles from './nav_bar.module.css'

export default function NavBar() {
    return (
        <>
            <Nav className="me-auto">
                <Nav.Link href="/players">Players</Nav.Link>
                <Nav.Link href="/getBySeason?year=1979">By Year</Nav.Link>
                <Nav.Link href="/analytics">Analytics</Nav.Link>
            </Nav>
        </>
    )
}