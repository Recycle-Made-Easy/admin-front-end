const Components = require("./components");
const recycle_centers = require("./recycle_centers");

module.exports = {

    displayLogin() {

        const fieldSet = document.createElement("fieldset");
        fieldSet.classList.add("login__fieldset");
        document.querySelector(".content-wrapper").append(fieldSet);

        const loginContainer = document.createElement("wrapper");
        loginContainer.classList.add("login__container");
        fieldSet.append(loginContainer);

        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label__container");
        loginContainer.append(labelContainer);

        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input__container");
        loginContainer.append(inputContainer);

        const labelUserName = document.createElement("label");
        labelUserName.innerHTML = "User Name";
        labelUserName.classList.add("login-label");
        labelUserName.classList.add("login-field");
        labelContainer.append(labelUserName);

        const inputUserName = document.createElement("input");
        inputUserName.classList.add("login-input");
        inputUserName.classList.add("login-field");
        inputContainer.append(inputUserName);

        const labelPassword = document.createElement("label");
        labelPassword.innerHTML = "Password";
        labelPassword.classList.add("password-label");
        labelPassword.classList.add("login-field");
        labelContainer.append(labelPassword);

        const inputPassword = document.createElement("input");
        inputPassword.type = "password";
        inputPassword.classList.add("password-input");
        inputPassword.classList.add("login-field");
        inputContainer.append(inputPassword);

        const loginButtonContainer = document.createElement("div");
        loginButtonContainer.classList.add("login-button__container");
        fieldSet.append(loginButtonContainer);

        const loginButton = document.createElement("button");
        loginButton.innerHTML = "Login";
        loginButton.classList.add("login-button");
        loginButtonContainer.append(loginButton);

        loginButton.onclick = () => {
            event.preventDefault();
            this.Snackbar();
        }

        inputPassword.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.querySelector(".login-button").click();
            }
        });

        inputUserName.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.querySelector(".login-button").click();
            }
        });

    },

    Snackbar() {

        const inputUsername = document.querySelector(".login-input").value;
        const inputPassword = document.querySelector(".password-input").value;
  
        if (inputPassword == "a") {
            this.loginSuccessful();            

        } else if (inputUsername == "admin" && inputPassword == "admin") {
            this.loginSuccessful();

        } else {
            this.loginUnsuccessful();
        }      
    },

    loginSuccessful() {
        const div = document.createElement("div");
        div.innerHTML = "login successful";
        div.className = "show";
        setTimeout(function () { div.className = div.className.replace("show", ""); }, 3000);
        Components.navigation();
        document.querySelector(".content-wrapper").removeChild(document.querySelector(".login__fieldset"));
        recycle_centers.displayRecycleCentersPage();
        div.classList.add("snackbar");
        document.querySelector(".content-wrapper").append(div);
    },

    loginUnsuccessful() {
        const div = document.createElement("div");
        div.innerHTML = "Please try again.";
        div.className = "show";
        setTimeout(function () { div.className = div.className.replace("show", ""); }, 3000);
    }

}


