// /pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import type { AppProps } from 'next/app';
import AppNavbar from '@components/AppNavBar/AppNavBar';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <main style={{ backgroundColor: '#f0f2f5', paddingTop: '20px', minHeight: '100vh' }}>
                <Container>
                    <AppNavbar />
                    <div style={{ height: '20px' }}></div>
                    <Component {...pageProps} />

                </Container>
            </main>
        </>
    );
}
