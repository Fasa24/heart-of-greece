export async function getMenu(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
}