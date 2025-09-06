const baseUrl = 'http://backend:3001';

export async function fetchItemsSSR() {
    try {
        const res = await fetch(`${baseUrl}/api/items`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        return [];
    }
}
export async function fetchItemSSR(id: any) {
    try {
        const res = await fetch(`${baseUrl}/api/items/${id}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
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
        return null;
    }
}

export async function fetchPlayerStatsByYear(id: string) {
    try {
        const res = await fetch(`${baseUrl}/api/getJoinedItems/${id}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`SSR fetchPlayerStatsByYear error for ${id}:`, err);
        return null;
    }
}

export async function fetchAllStatsByYear(year: number) {
    try {
        const res = await fetch(`${baseUrl}/api/getBySeason/${year}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`SSR fetchAllStatsByYear error for ${year}`, err);
        return null;
    }
}

export async function searchPlayersByName(name: string) {
    try {
        const res = await fetch(`http://localhost:3001/api/searchPlayersByName/${name}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`SSR searchPlayersByName error for ${name}`, err);
        return null;
    }
}