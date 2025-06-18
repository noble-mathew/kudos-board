export async function getBoardData() {
    try {
        const webUrl = import.meta.env.VITE_WEB_URL;
        const resp = await fetch(webUrl);
        if (!resp.ok) {
            throw new Error('Failed to fetch board data');
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}