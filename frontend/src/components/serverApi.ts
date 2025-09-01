const baseUrl = 'http://backend:3001';
export async function fetchItemsSSR() {
    console.log('Fetching items from server...');
    try {
        const res = await fetch(`${baseUrl}/api/items`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('SSR fetchItems error:', err);
        return [];
    }
}

export async function storeItemSSR(item: { id: number; name: string; completed: boolean }) {
    try {
        const res = await fetch(`${baseUrl}/api/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error(`Store failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error('SSR storeItem error:', err);
        return null;
    }
}
