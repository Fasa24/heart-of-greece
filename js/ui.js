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



import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

const themeOptions = () =>
    document.body.classList.contains("dark-mode")
        ? { background: "#1F2937", color: "#E5E7EB" }
        : {};

export function alertError(text) {
    return Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text,
        ...themeOptions(),
    });
}

export function alertSuccess(title, text) {
    return Swal.fire({ icon: "success", title, text, ...themeOptions() });
}

export async function confirmAction(title, text, confirmText = "Yes") {
    const result = await Swal.fire({
        icon: "question",
        title,
        text,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: "Cancel",
        ...themeOptions(),
    });
    return result.isConfirmed;
}