const Map = require("./map");
const Config = require("./config");
// const Components = require("./components");

module.exports = {

    displayUserPage() {
        this.locationForm();
        this.localAreaDropdown();
        this.categories();
        this.addresses(Config.EndPoints().get("get_all_centers"));
        this.googleMap();
    },

    locationForm() {

        const flexWrapperOuter = document.createElement("wrapper");
        flexWrapperOuter.classList.add("flex-wrapper-outer");
        document.querySelector(".content-wrapper").append(flexWrapperOuter);

        const flexWrapperLeft = document.createElement("wrapper");
        flexWrapperLeft.classList.add("flex-wrapper-left");
        flexWrapperOuter.append(flexWrapperLeft);

        const locationSelectionContainer = document.createElement("section");
        locationSelectionContainer.classList.add("location-selection-container");
        flexWrapperLeft.append(locationSelectionContainer);

        const dropDownMenuTitle = document.createElement("h3");
        dropDownMenuTitle.innerHTML = "Select A Location";
        dropDownMenuTitle.classList.add("location-selection-header");
        locationSelectionContainer.append(dropDownMenuTitle);

        const locationWrapper = document.createElement("wrapper");
        locationWrapper.classList.add("location-wrapper");
        locationSelectionContainer.append(locationWrapper);

        const dropDownDiv = document.createElement("div");
        dropDownDiv.classList.add("dropdown");
        locationWrapper.append(dropDownDiv);

        const byTown = document.createElement("p");
        byTown.innerHTML = "By city";
        byTown.classList.add("by-town");
        dropDownDiv.append(byTown);

        const zipCodeForm = document.createElement("form");
        zipCodeForm.classList.add("form");
        locationWrapper.append(zipCodeForm);

        const zipCodeName = document.createElement("label");
        zipCodeName.textContent = "By Zip code";
        zipCodeName.classList.add("name");
        zipCodeForm.append(zipCodeName);

        const inputType = document.createElement("input");
        inputType.classList.add("input");
        inputType.classList.add("location-form__input");
        zipCodeForm.append(inputType);

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        submitButton.classList.add("submit");
        submitButton.classList.add("location-form__button");
        zipCodeForm.append(submitButton);
        submitButton.onclick = (event) => {
            Map.searchByZipCode();
        }
    },

    async localAreaDropdown() {
        // Create dropdown.
        const myParent = document.body;
        const selectList = document.createElement("select");
        selectList.id = "selectList";
        myParent.appendChild(selectList);

        // Displays first option in the dropdown as empty.
        const option = document.createElement("option");
        option.value = "";
        option.text = "";
        selectList.appendChild(option);
        document.querySelector(".by-town").append(selectList);

        // Populate dropdown with local area names.
        // const newLocal = await Config.LocalAreas();
        // newLocal.forEach(localArea => {
        //     const option = document.createElement("option");
        //     option.value = localArea.placeId;
        //     option.text = localArea.name;
        //     option.id = localArea.id;
        //     selectList.appendChild(option);
        //     document.querySelector(".by-town").append(selectList);
        // })       

        // Populate dropdown with a list of cities we have recycle centers for.
        const endpoint = Config.EndPoints().get("get_list_of_cities");
        const cities = await Config.FetchData(endpoint);
        cities.forEach(city => {
            const option = document.createElement("option");
            option.text = city;
            option.value = city;
            selectList.appendChild(option);
            document.querySelector(".by-town").append(selectList);
        })

        // Update Google Map when different local area is selected.
        selectList.addEventListener('change', (event) => {
            // Map.searchByTown();            
            // const placeId = document.querySelector("#selectList").value;
            // if (placeId == "") {
            //     this.addresses(Config.EndPoints().get("get_all_centers"));
            // }
            // const endpoint = Config.EndPoints().get("get_centers_by_placeId") + placeId;
            // this.addresses(endpoint);

            const city = document.querySelector("#selectList").value;
            if (city == "") {
                this.addresses(Config.EndPoints().get("get_all_centers"));
            }
            const endpoint = Config.EndPoints().get("get_centers_by_city") + city;
            this.addresses(endpoint);
        }
        )
    },

    categories() {

        const categoryContainer = document.createElement("section");
        categoryContainer.classList.add("recycling-category-container");
        document.querySelector(".flex-wrapper-left").append(categoryContainer);

        // endpoint is updated inside the fetch but needs to be outside to have access to this.addresses()
        let endpoint = Config.EndPoints().get("get_filtered_centers");

        fetch("http://localhost:8080/api/categories/")
            .then(res => res.json())
            .then(function (data) {
                for (let index = 0; index < data.length; index++) {
                    const div = document.createElement("div")
                    div.classList.add(".category-checkbox");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = data[index].id;
                    checkbox.id = data[index].name + "-checkbox";
                    checkbox.name = "category-checkbox";
                    const label = document.createElement("label");
                    label.htmlFor = data[index].name + "-checkbox";
                    label.appendChild(document.createTextNode(data[index].name));
                    categoryContainer.append(checkbox);
                    categoryContainer.append(label);
                    categoryContainer.append(div);

                    checkbox.addEventListener('change', function () {
                        console.log("Checkbox with category id " + checkbox.value + " was clicked on.");

                        // find which categories are selected
                        const checkboxes = document.getElementsByName("category-checkbox");
                        const selectedCategories = [];
                        let categoryId; // temporary; backend doesn't accept array yet
                        checkboxes.forEach(box => {
                            if (box.checked) {
                                selectedCategories.push(box.value);
                                categoryId = box.value;
                            }
                        })

                        // find if a city is selected
                        let city = document.querySelector("#selectList").value;
                        endpoint = Config.EndPoints().get("get_filtered_centers"); // resets endpoint
                        if (!city == "") {
                            // city is not null, so it'll need to be included in the filtered list
                            // this endpoint will need updated to accept an array of ids instead of just one
                            endpoint = endpoint + city + "/" + categoryId;
                        } else {
                            // city is null, so just filter on categories
                            endpoint = endpoint + categoryId;
                        }
                        // updates the list of recycle centers
                        console.log(endpoint);
                        // Components.addresses(endpoint); // doesn't seem to work here
                        // stuff below is copied from this.addresses()...
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

                        fetch(endpoint)
                            .then(res => res.json())
                            .then(function (data) {
                                for (let index = 0; index < data.length; index++) {
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
                                }
                            })
                    })
                }
            })
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
    },

    googleMap() {
        // Adds Google Map to the page.
        const googleMap = document.createElement("div");
        googleMap.classList.add("google-map");
        document.querySelector(".flex-wrapper-outer").append(googleMap);
        Map.displayMap();
    }
}