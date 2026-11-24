export function validateForm(formData) {
    const errors = {};

    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();

    if (fullName === "") {
        errors.fullName = "Full name is required.";
    } else if (fullName.length < 3) {
        errors.fullName = "Full name must have at least 3 characters.";
    }

    if (email === "") {
        errors.email = "Email is required.";
    } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
}

    if (phone === "") {
        errors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone)) {
        errors.phone = "Phone number must contain exactly 10 digits.";
    }

    return errors;
}