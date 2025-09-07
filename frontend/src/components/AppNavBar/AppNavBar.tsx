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

export default function AppNavbar() {


    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
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
