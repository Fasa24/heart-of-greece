const btnTheme = document.getElementById("button-theme");

btnTheme.addEventListener("click", () => {
    const esOscuro = document.body.classList.toggle("dark-mode");
    btnTheme.textContent = esOscuro ? "Light mode" : "Dark mode";
});