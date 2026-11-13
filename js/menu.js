import { getMenu } from "./api.js";

const container = document.querySelector(".menu-section__items");
const status = document.getElementById("menu-status");
const template = document.getElementById("card-template");

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
        const dishes = await getMenu("data/menu.json");

        if (!dishes.length) {                          
            status.textContent = "No dishes available right now.";
            return;
        }

        status.textContent = "";                       
        render(dishes);
    } catch (err) {                                    
        console.error("Menu not loaded:", err.message);
        status.textContent = "We couldn't load the menu. Please try again later.";
    }
}

loadMenu();