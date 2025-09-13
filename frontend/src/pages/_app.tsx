// /pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import type { AppProps } from 'next/app';
import AppNavbar from '@components/AppNavBar/AppNavBar';
import { LeagueProvider } from '../context/LeagueContext';
import { useReportWebVitals } from 'next/web-vitals';
import styles from '@components/Home/main.module.css'


export default function MyApp({ Component, pageProps }: AppProps) {
    useReportWebVitals((metric) => {
        console.log(metric); // You can send this to an analytics service
    });
    return (
        <>
            <main style={{ backgroundColor: '#f0f2f5', paddingTop: '0px', minHeight: '100vh' }}>
                <Container fluid="xxl" className={styles.mainContainer}>
                    <LeagueProvider>
                        <AppNavbar />
                        <div style={{ height: '20px' }}></div>
                        <Component {...pageProps} />
                    </LeagueProvider>
                </Container>
            </main>
        </>
    );
}
