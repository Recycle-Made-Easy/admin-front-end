const Components = require("./components");

module.exports = {

    displayLogin() {

        const flexWrapperOuter = document.createElement("wrapper");
        flexWrapperOuter.classList.add("flex-wrapper-outer");
        document.querySelector(".content-wrapper").append(flexWrapperOuter);

        const labelUserName = document.createElement("label");
        labelUserName.innerHTML = "User Name";
        labelUserName.classList.add("login-label");
        flexWrapperOuter.append(labelUserName);

        const inputUserName = document.createElement("input");
        inputUserName.classList.add("login-input");
        flexWrapperOuter.append(inputUserName);

        const labelPassword = document.createElement("label");
        labelPassword.innerHTML = "Password";
        labelPassword.classList.add("password-label");
        flexWrapperOuter.append(labelPassword);

        const inputPassword = document.createElement("input");
        inputPassword.type = "password";
        inputPassword.classList.add("password-input");
        flexWrapperOuter.append(inputPassword);

        const loginButton = document.createElement("button");
        loginButton.innerHTML = "Login";
        loginButton.classList.add("login-button");
        flexWrapperOuter.append(loginButton);


        loginButton.onclick = () => {
            event.preventDefault();
            Components.navigation();
            this.Snackbar();


        }
    },

    Snackbar() {
        
        
        const div = document.createElement("div");
        div.innerHTML = "login successful";
        div.classList.add("snackbar");
        document.querySelector(".flex-wrapper-outer").append(div);
        
        div.className = "show";
    }



}