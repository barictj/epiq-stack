import SearchBar from './SearchBar/SearchBar';
import { useState, useEffect, useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { searchPlayersByName } from '../serverApi';
import NavBar from './NavBar/NavBar';
import styles from './app_nav_bar.module.css';

export default function AppNavbar() {


    return (
        <Navbar className={styles.navbar} expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">EPIQ</Navbar.Brand>
                <Navbar.Toggle aria-controls="epi-navbar" />
                <Navbar.Collapse id="epi-navbar">
                    <NavBar />
                    <SearchBar />
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
