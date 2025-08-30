import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Enables React Bootstrap styling

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
