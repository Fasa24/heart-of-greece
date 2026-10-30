const btnTheme = document.getElementById("button-theme");

btnTheme.addEventListener("click", () => {
    const esOscuro = document.body.classList.toggle("dark-mode");
    btnTheme.textContent = esOscuro ? "Light mode" : "Dark mode";
});

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".card").forEach((card) => {
        const match = card.textContent.toLowerCase().includes(text);
        card.hidden = !match;
    });
});