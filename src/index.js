
const form = document.querySelector("#form");
const formInputs = Array.from(document.querySelectorAll(".input")).slice(0, 4);
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const passwordInputs = Array.from([password, confirmPassword]);


form.addEventListener("submit", validateForm);
formInputs.forEach(input => input.addEventListener("input", validateInput));
passwordInputs.forEach(input => input.addEventListener("input", validatePassword));


function validateForm(event) {
    if (form.checkValidity() && validatePassword()) {
        event.preventDefault()

    }
    else {
        event.preventDefault();

        formInputs.forEach(input => {
            if (input.checkValidity()) {
                input.classList.add("border-green-600");
                input.classList.remove("border-red-600");
            }
            else {
                input.classList.add("border-red-600");
                input.classList.remove("border-green-600");
            }
        })

        validatePassword();
    }
}


function validateInput(event) {
    const targetInput = event.target;

    if (targetInput.checkValidity()) {
        targetInput.classList.add("border-green-600");
        targetInput.classList.remove("border-red-600");
    }
    else {
        targetInput.classList.add("border-red-600");
        targetInput.classList.remove("border-green-600");
    }

}


function validatePassword() {
    if (password.value === confirmPassword.value && password.value.length >= 8) {
        password.classList.add("border-green-600");
        confirmPassword.classList.add("border-green-600");
        password.classList.remove("border-red-600");
        confirmPassword.classList.remove("border-red-600");
        return true;
    }
    else {
        password.classList.add("border-red-600");
        confirmPassword.classList.add("border-red-600");
        password.classList.remove("border-green-600");
        confirmPassword.classList.remove("border-green-600");
    }
}