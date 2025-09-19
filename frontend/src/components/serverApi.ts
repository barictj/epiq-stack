const baseUrl = 'http://backend:3001';

export async function fetchItemsSSR(league: string) {
    try {
        const res = await fetch(`${baseUrl}/api/items?league=${encodeURIComponent(league)}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        return [];
    }
}

export async function fetchItemSSR(id: any, league: string) {
    try {
        const res = await fetch(`${baseUrl}/api/items/${id}?league=${encodeURIComponent(league)}`);
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

export async function fetchPlayerStatsByYear(id: string, league: string) {
    try {
        const res = await fetch(`${baseUrl}/api/getJoinedItems/${id}?league=${encodeURIComponent(league)}`);
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
export async function fetchTopPlayers({
    year,
    startAt = 0,
    endBy = 25,
    sortBy = 'total_points',
    direction = 'DESC',
    league = 'NBA',
}) {
    const query = new URLSearchParams({
        year: String(year),
        startAt: String(startAt),
        endBy: String(endBy),
        sortBy,
        direction,
        league,
    });

    const res = await fetch(`${baseUrl}/api/getTopPlayersByYear?${query.toString()}`);

    if (!res.ok) {
        console.error("❌ API error:", res.status, await res.text());
        throw new Error('Failed to fetch top players');
    }

    const data = await res.json(); // ✅ Await the response
    return data; // ✅ Return it
}


export async function getAverageStatsBySeason(season_year: number) {
    try {
        const res = await fetch(`${baseUrl}/api/getAverageStatsBySeason/${season_year}`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`SSR getAverageStatsBySeason error for ${season_year}`, err);
        return null;
    }
}
export async function getAllAverageStatsBySeason() {
    try {
        const res = await fetch(`${baseUrl}/api/getAverageStatsBySeason/`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`SSR getAverageStatsBySeason error for every year`, err);
        return null;
    }
}

// Teams related API
export async function fetchTopTeams({
    year,
    startAt = 0,
    endBy = 25,
    sortBy = 'efficiency_possession_impact_quotient',
    direction = 'DESC',
    league = 'NBA',
}) {
    const query = new URLSearchParams({
        year: String(year),
        startAt: String(startAt),
        endBy: String(endBy),
        sortBy,
        direction,
        league,
    });
    const res = await fetch(`${baseUrl}/api/getTopTeamsByYear?${query.toString()}`);
    if (!res.ok) {
        console.error("❌ API error:", res.status, await res.text());
        throw new Error('Failed to fetch top teams');
    }
    const data = await res.json(); // ✅ Await the response
    return data; // ✅ Return it
}
