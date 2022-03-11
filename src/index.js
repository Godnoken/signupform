const form = document.querySelector("#form");
const formInputs = document.querySelectorAll(".input")
const nonPasswordInputs = Array.from(formInputs).slice(0, 4);
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
nonPasswordInputs.forEach(input => input.addEventListener("change", validateOnChange));
nonPasswordInputs.forEach(input => input.addEventListener("input", validateOnInput));
passwordInputs.forEach(input => input.addEventListener("input", validatePasswordOnInput));
passwordInputs.forEach(input => input.addEventListener("change", validatePasswordOnChange));
darkLightSwitch.addEventListener("click", switchPreferenceMode);


function validateForm(event) {
    if (form.checkValidity() && validatePasswordOnInput()) {
        event.preventDefault()
    }
    else {
        event.preventDefault();

        nonPasswordInputs.forEach(input => {
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
        passwordErrorLength.style.color = "#16A34A";
        passwordErrorMatch.style.color = "#16A34A";
        return true;
    }
    else if (password.value === confirmPassword.value && password.value.length !== 0) {
        passwordErrorMatch.style.color = "#16A34A";
    }
    else if (password.value.length >= 8) {
        passwordErrorLength.style.color = "#16A34A";
    }

}

function validatePasswordOnChange() {
    if (password.value !== confirmPassword.value || password.value.length < 8) {
        password.classList.add("border-red-600");
        confirmPassword.classList.add("border-red-600");
        password.classList.remove("border-green-600");
        confirmPassword.classList.remove("border-green-600");
        passwordErrorLength.style.color = "#DC2626";
        passwordErrorMatch.style.color = "#DC2626";

        if (password.value !== confirmPassword.value && password.value.length >= 8) {
            passwordErrorLength.style.color = "#16A34A";
        }
        else if (password.value === confirmPassword.value && password.value.length < 8 && password.value.length !== 0) {
            passwordErrorMatch.style.color = "#16A34A";
        }
    }
}


function switchPreferenceMode() {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
        html.classList.toggle("dark");
        window.localStorage.setItem("theme", "light");
        addCssProperties("#f8f8ff", "#970076");
    }
    else {
        html.classList.toggle("dark");
        window.localStorage.setItem("theme", "dark");
        addCssProperties("black", "#ff46d7");
    }
}


if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
  addCssProperties("black", "#ff46d7");

} else {
  document.documentElement.classList.remove('dark')
  addCssProperties("#f8f8ff", "#970076");
}

function addCssProperties(shadowColor, fillColor) {
    formInputs.forEach(input => {
        input.style.setProperty("box-shadow", `0 0 0 30px ${shadowColor} inset`)
        input.style.setProperty("-webkit-text-fill-color", fillColor);
    });
}