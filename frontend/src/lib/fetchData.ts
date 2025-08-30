// src/lib/fetchData.ts
export async function fetchData<T>(url: string): Promise<T> {
    console.log('Fetching data from:', url);

    const res = await fetch(url, { next: { revalidate: 0 } }); // disables caching
    console.log('Response status:', res.status);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
}
