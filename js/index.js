const root = document.documentElement;
    const button = document.getElementById("button-theme");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        const isDark = theme === "dark";
        button.textContent = isDark ? "Light mode" : "Dark mode";
        button.setAttribute("aria-pressed", isDark);
        button.setAttribute("aria-label", isDark ? "Light mode" : "Dark mode");
    }

    button.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem("theme", next);
    });