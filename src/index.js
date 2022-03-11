const form = document.querySelector("#form");
const formInputs = Array.from(document.querySelectorAll(".input")).slice(0, 4);
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const passwordInputs = Array.from([password, confirmPassword]);
const passwordErrorLength = document.querySelector("#passwordErrorLength");
const passwordErrorMatch = document.querySelector("#passwordErrorMatch");
const darkLightSwitch = document.querySelector("#darkLightSwitch");

// Prevents mobile layout from breaking on input focus. Layout breaks because of
// using vh on containers.
const viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);

form.addEventListener("submit", validateForm);
formInputs.forEach(input => input.addEventListener("change", validateOnChange));
formInputs.forEach(input => input.addEventListener("input", validateOnInput));
passwordInputs.forEach(input => input.addEventListener("input", validatePasswordOnInput));
passwordInputs.forEach(input => input.addEventListener("change", validatePasswordOnChange));
darkLightSwitch.addEventListener("click", switchPreferenceMode);


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
                input.nextElementSibling.classList.add("visible");
                input.nextElementSibling.classList.remove("invisible");
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
        passwordErrorLength.classList.add("text-green-600");
        passwordErrorMatch.classList.add("text-green-600");
        return true;
    }

    if (password.value === confirmPassword.value && password.value.length !== 0) {
        passwordErrorMatch.classList.add("text-green-600");
    }
    else if (password.value.length >= 8) {
        passwordErrorLength.classList.add("text-green-600");
    }

}

function validatePasswordOnChange() {
    if (password.value !== confirmPassword.value || password.value.length < 8) {
        password.classList.add("border-red-600");
        confirmPassword.classList.add("border-red-600");
        password.classList.remove("border-green-600");
        confirmPassword.classList.remove("border-green-600");
        passwordErrorLength.classList.add("text-red-600");
        passwordErrorMatch.classList.add("text-red-600");
        passwordErrorLength.classList.remove("text-green-600");
        passwordErrorMatch.classList.remove("text-green-600");

        if (password.value !== confirmPassword.value && password.value.length >= 8) {
            passwordErrorLength.classList.remove("text-red-600");
            passwordErrorLength.classList.add("text-green-600");
        }
        else if (password.value === confirmPassword.value && password.value.length < 8 && password.value.length !== 0) {
            passwordErrorMatch.classList.remove("text-red-600");
            passwordErrorMatch.classList.add("text-green-600");
        }
    }
}


function switchPreferenceMode() {
    const html = document.documentElement;

    if (html.classList.contains("dark")) html.classList.toggle("dark");
    else html.classList.toggle("dark");
}