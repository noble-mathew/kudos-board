export async function getBoardData(category, search) {
    try {
        const webUrl = import.meta.env.VITE_WEB_URL;
        const params = new URLSearchParams();

        if (category && category !== "all") {
            params.set("category", category);
        }

        if (search?.trim()) {
            params.set("title", search.trim());
        }

        const queryString = params.toString();
        const url = queryString ? `${webUrl}?${queryString}` : webUrl;

        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error('Failed to fetch board data');
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}