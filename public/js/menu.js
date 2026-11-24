import { getMenu, createDish } from "./api.js";
import { alertError } from "./ui.js";

const container = document.querySelector(".menu-section__items");
const status = document.getElementById("menu-status");
const template = document.getElementById("card-template");
const form = document.getElementById("add-dish-form");
const formError = document.getElementById("dish-form-error");

const isHomePage = !window.location.pathname.includes("/pages/menu.html");

const render = (dishes) => {
    container.replaceChildren();

    dishes.forEach((dish) => {
        const clone = template.content.cloneNode(true);

        const img = clone.querySelector(".card__image");
        img.src = dish.image;
        img.alt = dish.name;
        img.title = dish.name;

        clone.querySelector(".card__title").textContent = `${dish.name} €${dish.price}`;
        clone.querySelector(".card__caption").textContent = dish.description;

        container.append(clone);
    });
};

async function loadMenu() {
    status.textContent = "Loading menu...";

    try {
        const dishes = await getMenu();

        if (!dishes.length) {
            status.textContent = "No dishes available right now.";
            return;
        }

        const visibleDishes = isHomePage ? dishes.slice(0, 3) : dishes;

        status.textContent = "";
        render(visibleDishes);
    } catch (err) {
        console.error("Menu not loaded:", err.message);
        status.textContent = "We couldn't load the menu. Please try again later.";
        alertError("We couldn't load the menu. Please try again later.");
    }
}

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (formError) formError.textContent = "";

        const formData = new FormData(form);
        const payload = {
            name: String(formData.get("name") ?? "").trim(),
            price: Number(formData.get("price")),
            description: String(formData.get("description") ?? "").trim(),
            image: String(formData.get("image") ?? "").trim(),
        };

        try {
            await createDish(payload);
            form.reset();
            await loadMenu();
        } catch (err) {
            if (formError) formError.textContent = err.message;
            alertError(err.message);
        }
    });
}

loadMenu();