import { fetchItemsSSR } from '../components/serverApi';
import Home from '@components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export async function getServerSideProps() {
    const items = await fetchItemsSSR();
    return { props: { items } };
}

export default function Index({ items }: { items: any[] }) {
    console.log('Items:', items);
    return (
        <main style={{ backgroundColor: '#f0f2f5', paddingTop: '20px', minHeight: '100vh' }}>
            <Home items={items} />
        </main>
    );
}
