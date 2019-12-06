const Config = require("./config");
const AdminCat = require("./category_admin");
const recycle_centers = require("./recycle_centers");

module.exports = {

    header() {
        const wrapper = document.querySelector(".wrapper");

        const createdHeaderContainer = document.createElement("header");
        createdHeaderContainer.classList.add("header__container");
        wrapper.append(createdHeaderContainer);

        const headerTitle = document.createElement("h1");
        headerTitle.innerHTML = "Recycle Made Easy";
        headerTitle.classList.add("header__title");
        headerTitle.href = "javascript:void(0);";
        createdHeaderContainer.append(headerTitle);

        const contentBody = document.createElement("div");
        contentBody.classList.add("content-wrapper");
        wrapper.append(contentBody);

        const contentBody2 = document.createElement("div");
        contentBody2.classList.add("content-wrapper2");
        wrapper.append(contentBody2);
        
    },

    login() {

        document.querySelector(".nav__button").style.display = "none";
        const loginButton = document.createElement("button");
        loginButton.classList.add("login__button");
        loginButton.textContent = "Login";
        navContainer.append(loginButton);

        loginButton.onclick = () => {
            const login = document.querySelector(".nav__button").style.display = "none";
            if (login.style.display === "block") {
                login.style.display = "none";
            } else {
                login.style.display = "block";
            }
        }

    },


    navigation() {

        const hc = document.querySelector(".header__container");
        const navContainer = document.createElement("div");
        navContainer.classList.add("nav__container");
        hc.append(navContainer);

        const links = document.createElement("div");
        links.classList.add("nav__list");
        navContainer.append(links);

        const aLink2 = document.createElement("a");
        aLink2.classList.add("nav__list-item");
        aLink2.textContent = "Recycle Centers";
        aLink2.href = "javascript:void(0);";
        aLink2.onclick = () => {
            document.querySelector(".content-wrapper").innerHTML = "";
            document.querySelector(".content-wrapper2").innerHTML = "";
            recycle_centers.displayRecycleCentersPage();
        }
        links.append(aLink2);

        const aLink3 = document.createElement("a");
        aLink3.classList.add("nav__list-item");
        aLink3.textContent = "Recycle Categories";
        aLink3.href = "javascript:void(0);";
        aLink3.onclick = () => {
            document.querySelector(".content-wrapper").innerHTML = "";
            document.querySelector(".content-wrapper2").innerHTML = "";
            AdminCat.adminCategories();
            
        }
        links.append(aLink3);

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