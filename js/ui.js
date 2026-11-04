export function showErrors(errors) {
    for (const field in errors) {
        const errorElement = document.getElementById(`${field}-error`);

        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    }
}

export function clearErrors() {
    const errorElements = document.querySelectorAll(".form__error");

    errorElements.forEach((element) => {
        element.textContent = "";
    });
}