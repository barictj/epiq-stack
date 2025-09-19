import SearchBar from './SearchBar/SearchBar';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Link from 'next/link';
import NavBar from './NavBar/NavBar';
import styles from './app_nav_bar.module.css';

import { useLeague } from '../../context/LeagueContext';

export default function AppNavbar() {
    const { league } = useLeague();

    return (
        <Navbar className={styles.navbar} expand="lg" sticky="top">
            <Container>
                <Link href={`/?league=${league}`} passHref legacyBehavior>
                    <Navbar.Brand>EPIQ</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="epi-navbar" />
                <Navbar.Collapse id="epi-navbar">
                    <NavBar />
                    <SearchBar />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

