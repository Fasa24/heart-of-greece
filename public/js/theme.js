const save = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

const read = (key, fallback = null) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};


const btnTheme = document.getElementById("button-theme");

const applyTheme = (theme) => {
    const dark = theme === "dark";
    document.body.classList.toggle("dark-mode", dark);
    if (btnTheme) {
        btnTheme.textContent = dark ? "🌙" : "☀️";
        btnTheme.setAttribute("aria-pressed", dark);
    }
};

applyTheme(read("theme", "light"));

if (btnTheme) {
    btnTheme.addEventListener("click", () => {
        const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
        applyTheme(next);
        save("theme", next);
    });
}


const searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(".card").forEach((card) => {
            card.hidden = !card.textContent.toLowerCase().includes(text);
        });
    });
}