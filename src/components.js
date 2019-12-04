const Map = require("./map");
const Config = require("./config");
const UserPage = require("./user_page");
const AdminCat = require("./category_admin");
const recycle_centers = require("./recycle_centers")

module.exports = {

    header() {
        const wrapper = document.querySelector(".wrapper");

        const createdHeaderContainer = document.createElement("header");
        createdHeaderContainer.classList.add("header__container");
        wrapper.append(createdHeaderContainer);

        const headerLeftSide = document.createElement("div");
        headerLeftSide.classList.add("header__left-side");
        createdHeaderContainer.append(headerLeftSide);

        const headerRightSide = document.createElement("div");
        headerRightSide.classList.add("header__right-side");
        createdHeaderContainer.append(headerRightSide);

        const headerTitle = document.createElement("h1");
        headerTitle.innerHTML = "Recycle Made Easy";
        headerTitle.classList.add("header__title");
        headerTitle.href = "javascript:void(0);";
        headerLeftSide.append(headerTitle);

        const contentBody = document.createElement("div");
        contentBody.classList.add("content-wrapper");
        wrapper.append(contentBody);

        headerTitle.onclick = () => {
            document.querySelector(".content-wrapper").innerHTML = "";
            UserPage.displayUserPage();
        }

        this.navigation();
        // this.login();
    },

    login() {

        document.querySelector(".nav__button").style.display = "none";
        const loginButton = document.createElement("button");
        loginButton.classList.add("login__button");
        loginButton.textContent = "Login";
        navContainer.append(loginButton);

        loginButton.onclick = () => {
            // loginButton.hidden = true;
            const login = document.querySelector(".nav__button").style.display = "none";
            if (login.style.display === "block") {
                login.style.display = "none";
            } else {
                login.style.display = "block";
            }
        }

    },


    navigation() {

        const hrs = document.querySelector(".header__right-side");
        const navContainer = document.createElement("div");
        navContainer.classList.add("nav__container");
        hrs.append(navContainer);

        const links = document.createElement("div");
        links.classList.add("nav__list");
        navContainer.append(links);

        const aLink2 = document.createElement("a");
        aLink2.classList.add("nav__list-item");
        aLink2.textContent = "Recycle Centers";
        aLink2.href = "javascript:void(0);";
        aLink2.onclick = () => {
            document.querySelector(".content-wrapper").innerHTML = "";
            recycle_centers.displayRecycleCentersPage();
        }
        links.append(aLink2);

        const aLink3 = document.createElement("a");
        aLink3.classList.add("nav__list-item");
        aLink3.textContent = "Recycle Categories";
        aLink3.href = "javascript:void(0);";
        aLink3.onclick = () => {
            document.querySelector(".content-wrapper").innerHTML = "";
            AdminCat.adminCategories();
        }
        links.append(aLink3);

        const navButton = document.createElement("button");
        navButton.classList.add("nav__button");
        navButton.textContent = "Menu";
        navContainer.append(navButton);

        // start with nav hidden
        links.style.display = "none"

        navButton.onclick = () => {
            const nav = document.querySelector(".nav__list")
            if (nav.style.display === "block") {
                nav.style.display = "none";
            } else {
                nav.style.display = "block";
            }
        }


    },

    async addresses(endpoint) {

        if (document.body.contains(document.querySelector(".addresses-container"))) {
            const addressContainer = document.querySelector(".addresses-container");
            addressContainer.innerHTML = "";
            addressContainer.classList.add("addresses-container");
            addressContainer.innerHTML = "Recycle Locations:";
        } else {
            const addressContainerNew = document.createElement("section");
            addressContainerNew.classList.add("addresses-container");
            addressContainerNew.innerHTML = "Recycle Locations:";
            document.querySelector(".flex-wrapper-left").append(addressContainerNew);
        }

        const addressContainer = document.querySelector(".addresses-container");
        const centers = await Config.FetchData(endpoint);
        centers.forEach(center => {
            const div = document.createElement("div")
            div.classList.add("address-location");
            const link = document.createElement('div')
            link.classList.add("address-link")
            link.value = center.name;
            link.innerHTML = center.name;
            link.onclick = (event) => {
                const placeId = center.placeId;
                Map.displayMapByPlaceId(placeId);
            }
            div.append(link);
            addressContainer.append(div);
        })
    }


}