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

export default function AppNavbar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            const data = await searchPlayersByName(query);
            setResults(data);
            setShowResults(true);
        } catch (err) {
            console.error('Search failed:', err);
            setResults([]);
            setShowResults(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand href="/">EPIQ</Navbar.Brand>
                <Navbar.Toggle aria-controls="epi-navbar" />
                <Navbar.Collapse id="epi-navbar">
                    <Nav className="me-auto">
                        <Nav.Link href="/players">Players</Nav.Link>
                        <Nav.Link href="/getBySeason?year=1979">By Year</Nav.Link>
                        <Nav.Link href="/analytics">Analytics</Nav.Link>
                    </Nav>

                    {/* Search bar and dropdown */}
                    <div
                        className="position-relative"
                        style={{ width: '300px' }}
                        ref={dropdownRef}
                    >
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Search players..."
                                className="me-2"
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type="submit" variant="outline-primary">
                                Search
                            </Button>
                        </Form>

                        {showResults && Array.isArray(results) && results.length > 0 && (
                            <ListGroup
                                className="position-absolute top-100 start-0 w-100 mt-2 z-3"
                                style={{ maxHeight: '300px', overflowY: 'auto' }}
                            >
                                {results.map((player) => (
                                    <ListGroup.Item
                                        key={player.id}
                                        onClick={() => {
                                            setShowResults(false);
                                            setQuery('');
                                        }}
                                    >
                                        <Link href={`/getByPlayer?id=${player.id}`} passHref>
                                            <span style={{ cursor: 'pointer' }}>{player.name}</span>
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
