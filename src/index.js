
const form = document.querySelector("#form");
const formInputs = Array.from(document.querySelectorAll(".input")).slice(0, 4);
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const passwordInputs = Array.from([password, confirmPassword]);
const passwordError = document.querySelector("#passwordError");


form.addEventListener("submit", validateForm);
formInputs.forEach(input => input.addEventListener("change", validateOnChange));
formInputs.forEach(input => input.addEventListener("input", validateOnInput));
passwordInputs.forEach(input => input.addEventListener("input", validatePasswordOnInput));
passwordInputs.forEach(input => input.addEventListener("change", validatePasswordOnChange));


function validateForm(event) {
    if (form.checkValidity() && validatePasswordOnInput()) {
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

        validatePasswordOnInput();
        validatePasswordOnChange();
    }
}

// Separation of onInput and onChange made to adhere to agressive-passive
// behaviour on error/validation
function validateOnInput(event) {
    const targetInput = event.target;
    const errorMessage = targetInput.nextElementSibling;

    if (targetInput.checkValidity()) {
        targetInput.classList.add("border-green-600");
        targetInput.classList.remove("border-red-600");
        errorMessage.classList.add("invisible");
        errorMessage.classList.remove("visible");
    }
}


function validateOnChange(event) {
    const targetInput = event.target;
    const errorMessage = targetInput.nextElementSibling;

    if (!targetInput.checkValidity()) {
        targetInput.classList.add("border-red-600");
        targetInput.classList.remove("border-green-600");
        errorMessage.classList.add("visible");
        errorMessage.classList.remove("invisible");
    }
}


function validatePasswordOnInput() {
    if (password.value === confirmPassword.value && password.value.length >= 8) {
        password.classList.add("border-green-600");
        confirmPassword.classList.add("border-green-600");
        password.classList.remove("border-red-600");
        confirmPassword.classList.remove("border-red-600");
        passwordError.classList.remove("visible");
        passwordError.classList.add("invisible");
        return true;
    }
}

function validatePasswordOnChange() {
    if (password.value !== confirmPassword.value || password.value.length < 8) {
        password.classList.add("border-red-600");
        confirmPassword.classList.add("border-red-600");
        password.classList.remove("border-green-600");
        confirmPassword.classList.remove("border-green-600");
        passwordError.classList.add("visible");
        passwordError.classList.remove("invisible");
        passwordError.textContent = "Password does not match and is less than 8 characters long";

        if (password.value !== confirmPassword.value && password.value.length >= 8) {
            passwordError.textContent = "Password does not match";
        }
        else if (password.value === confirmPassword.value && password.value.length < 8) {
            passwordError.textContent = "Password is less than 8 characters long"
        }
    }
}