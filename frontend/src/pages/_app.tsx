// /pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import type { AppProps } from 'next/app';
import AppNavbar from '@components/AppNavBar/AppNavBar';
import { useReportWebVitals } from 'next/web-vitals';
export default function MyApp({ Component, pageProps }: AppProps) {
    useReportWebVitals((metric) => {
        console.log(metric); // You can send this to an analytics service
    });
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
