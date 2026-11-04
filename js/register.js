import { validateForm } from "./validators.js";
import { showErrors, clearErrors } from "./ui.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    const formData = new FormData(registerForm);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
        showErrors(errors);
        return;
    }

    console.log("Registration successful!");

    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    document.getElementById("register-success").textContent =
        "Your registration information is valid!";
});

registerForm.addEventListener("reset", () => {
    clearErrors();

    document.getElementById("register-success").textContent = "";
});