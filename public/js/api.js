const MENU_ENDPOINT = "/api/menu.php";

export async function getMenu() {
    const res = await fetch(MENU_ENDPOINT);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
}

export async function createDish(dish) {
    const res = await fetch(MENU_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dish),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to create dish");
    return data;
}

