import styles from './search_bar.module.css';
import { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';
import { searchPlayersByName } from '../../serverApi';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // 🔍 Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setShowResults(false);
            return;
        }

        // Clear previous debounce
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            try {
                const data = await searchPlayersByName(query);
                setResults(data);
                setShowResults(true);
            } catch (err) {
                console.error('Search failed:', err);
                setResults([]);
                setShowResults(false);
            }
        }, 300); // ⏱ Debounce delay in ms
    }, [query]);

    // 🧼 Close dropdown when clicking outside
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
        <div className="position-relative" style={{ width: '300px' }} ref={dropdownRef}>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search players..."
                    className={`me-2 ${styles.searchInput}`}
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Form>

            {showResults && Array.isArray(results) && results.length > 0 && (
                <ListGroup
                    className={`${styles.searchDropdown} position-absolute top-100 start-0 w-100 mt-2 z-3`}
                    style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                    {results.map((player) => (
                        <ListGroup.Item
                            key={player.id}
                            className={styles.searchResultItem}
                            onClick={() => {
                                setShowResults(false);
                                setQuery('');
                            }}
                        >
                            <Link href={`/getByPlayer?id=${player.id}`} passHref legacyBehavior>
                                <a className={styles.searchLinks}>{player.name}</a>
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}
