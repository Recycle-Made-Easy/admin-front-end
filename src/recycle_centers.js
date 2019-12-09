const Config = require("./config");

module.exports = {

    displayRecycleCentersPage() {

        const wrapper = document.createElement("div");
        wrapper.classList.add("location-admin__container");
        document.querySelector(".content-wrapper").append(wrapper);

        const listContainer = document.createElement("div");
        listContainer.classList.add("location-list__container");
        wrapper.append(listContainer);

        const helperContainer = document.createElement("div");
        helperContainer.classList.add("location-top__container");
        wrapper.append(helperContainer);

        const searchBarContainer = document.createElement("div");
        searchBarContainer.classList.add("location-search__container");
        searchBarContainer.innerHTML = "Recycle Locations";
        helperContainer.append(searchBarContainer);

        const formLinkContainer = document.createElement("div");
        formLinkContainer.classList.add("location-link__container");
        helperContainer.append(formLinkContainer);

        const showAddForm = document.createElement("a");
        showAddForm.classList.add("add-form-link");
        showAddForm.innerHTML = "Add Recycle Center";
        showAddForm.href = "javascript:void(0);";
        formLinkContainer.append(showAddForm)
        showAddForm.onclick = () => {
            this.recycleCenterAddForm();
        };

        const addressContainer = document.createElement("div");
        addressContainer.classList.add("addresses-container");
        listContainer.append(addressContainer);

        const formContainer = document.createElement("div");
        formContainer.classList.add("location-form__container");
        wrapper.append(formContainer);

        const mapContainer = document.createElement("div");
        mapContainer.classList.add("location-map__container");
        wrapper.append(mapContainer);

        this.listOfRecycleCenters();
        this.recycleCenterAddForm();

    },

    async listOfRecycleCenters() {

        document.querySelector(".addresses-container").innerHTML = "";

        const endpoint = Config.EndPoints().get("get_all_centers");
        const centers = await Config.FetchData(endpoint);
        centers.forEach(center => {

            // Recycle Center Card Container
            const div = document.createElement("div")
            div.classList.add("address-location");
            document.querySelector(".addresses-container").append(div);

            // Recycle Center Name
            const link = document.createElement('div')
            link.classList.add("address-link")
            link.value = center.name;
            link.innerHTML = center.name;
            div.append(link);

            // Recycle Center City & State
            const cityState = document.createElement("div");
            cityState.classList.add("address-city-state__container");
            div.append(cityState);

            // Recycle Center City
            const city = document.createElement("div");
            city.classList.add("address-city");
            city.innerHTML = center.city + ",";
            cityState.append(city);

            // Recycle Center State
            const state = document.createElement("div");
            state.classList.add("address-state");
            state.innerHTML = center.state;
            cityState.append(state);

            // Recycle Center Zip Code
            const zip = document.createElement("div");
            zip.classList.add("address-zip");
            zip.innerHTML = center.zipCode;
            cityState.append(zip);

            // Center info populates in form when clicked on.

            div.onclick = () => {

                const inputName = document.querySelector(".location-form__input-name");
                const inputStreetAddress = document.querySelector(".location-form__input-street");
                const inputCity = document.querySelector(".location-form__input-city");
                const inputState = document.querySelector(".location-form__input-state");
                const inputZipCode = document.querySelector(".location-form__input-zip");
                const inputPlaceId = document.querySelector(".location-form__input-placeid");

                inputName.value = center.name;
                inputStreetAddress.value = center.streetAddress;
                inputCity.value = center.city;
                inputState.value = center.state;
                inputZipCode.value = center.zipCode;
                inputPlaceId.value = center.placeId;

                console.log("Inside div onclick event.");
                console.log(center);

                // Hide Submit button for adding a new center...
                document.querySelector(".submitButton-add").hidden = true;

                // Show Save Changes button for updating a center...
                const editButton = document.querySelector(".submitButton-edit");
                editButton.hidden = false;

                editButton.onclick = () => {
                    event.preventDefault();
                    fetch(`http://localhost:8080/api/centers/edit/` + center.id, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: inputName.value,
                            streetAddress: inputStreetAddress.value,
                            city: inputCity.value,
                            state: inputState.value,
                            zipCode: inputZipCode.value,
                            placeId: inputPlaceId.value,
                        })
                    })
                        .then(() => {
                            this.listOfRecycleCenters();
                        });
                }


            }

        })

    },


    recycleCenterAddForm() {

        document.querySelector(".location-form__container").innerHTML = "";

        const fieldSet = document.createElement("fieldset");
        fieldSet.classList.add("location-form__fieldset");
        document.querySelector(".location-form__container").append(fieldSet);

        const locationFormField = document.createElement("field");
        locationFormField.classList.add("location-form__field");
        fieldSet.append(locationFormField);

        const labelLocationName = document.createElement("label");
        labelLocationName.classList.add("location-form__label");
        labelLocationName.innerHTML = "Name";
        locationFormField.append(labelLocationName);

        const inputLocationName = document.createElement("input");
        inputLocationName.classList.add("location-form__input");
        inputLocationName.classList.add("location-form__input-name");
        inputLocationName.innerHTML = "Name";
        locationFormField.append(inputLocationName);

        const labelLocationStreetAddress = document.createElement("label");
        labelLocationStreetAddress.classList.add("location-form__label");
        labelLocationStreetAddress.innerHTML = "Street Address";
        locationFormField.append(labelLocationStreetAddress);

        const inputLocationStreetAddress = document.createElement("input");
        inputLocationStreetAddress.classList.add("location-form__input");
        inputLocationStreetAddress.classList.add("location-form__input-street");
        inputLocationStreetAddress.innerHTML = "Street Address";
        locationFormField.append(inputLocationStreetAddress);

        const labelLocationCity = document.createElement("label");
        labelLocationCity.classList.add("location-form__label");
        labelLocationCity.innerHTML = "City";
        locationFormField.append(labelLocationCity);

        const inputLocationCity = document.createElement("input");
        inputLocationCity.classList.add("location-form__input");
        inputLocationCity.classList.add("location-form__input-city");
        inputLocationCity.innerHTML = "City";
        locationFormField.append(inputLocationCity);

        const labelLocationState = document.createElement("label");
        labelLocationState.classList.add("location-form__label");
        labelLocationState.innerHTML = "State";
        locationFormField.append(labelLocationState);

        const inputLocationState = document.createElement("input");
        inputLocationState.classList.add("location-form__input");
        inputLocationState.classList.add("location-form__input-state");
        inputLocationState.innerHTML = "State";
        locationFormField.append(inputLocationState);

        const labelLocationZipCode = document.createElement("label");
        labelLocationZipCode.classList.add("location-form__label");
        labelLocationZipCode.innerHTML = "Zip Code";
        locationFormField.append(labelLocationZipCode);

        const inputLocationZipCode = document.createElement("input");
        inputLocationZipCode.classList.add("location-form__input");
        inputLocationZipCode.classList.add("location-form__input-zip");
        inputLocationZipCode.innerHTML = "Zip Code";
        locationFormField.append(inputLocationZipCode);

        const labelLocationPlaceId = document.createElement("label");
        labelLocationPlaceId.classList.add("location-form__label");
        labelLocationPlaceId.innerHTML = "Google Maps Place Id";
        locationFormField.append(labelLocationPlaceId);

        const inputLocationPlaceId = document.createElement("input");
        inputLocationPlaceId.classList.add("location-form__input");
        inputLocationPlaceId.classList.add("location-form__input-placeid");
        locationFormField.append(inputLocationPlaceId);

        const submitButton = document.createElement("button");
        submitButton.classList.add("submitButton");
        submitButton.classList.add("submitButton-add");
        submitButton.innerHTML = "Submit";
        locationFormField.append(submitButton);
        this.addRecycleCenterSubmitButtonOnclick();

        // Create the Save Changes button but hide it...
        const editButton = document.createElement("button");
        editButton.classList.add("submitButton");
        editButton.classList.add("submitButton-edit");
        editButton.innerHTML = "Save Changes";
        document.querySelector(".location-form__field").append(editButton);
        editButton.hidden = true;

    },

    // saveChangesButtonOnclick(div) {

    //     div.onclick = () => {

    //         const inputName = document.querySelector(".location-form__input-name");
    //         const inputStreetAddress = document.querySelector(".location-form__input-street");
    //         const inputCity = document.querySelector(".location-form__input-city");
    //         const inputState = document.querySelector(".location-form__input-state");
    //         const inputZipCode = document.querySelector(".location-form__input-zip");
    //         const inputPlaceId = document.querySelector(".location-form__input-placeid");

    //         inputName.value = center.name;
    //         inputStreetAddress.value = center.streetAddress;
    //         inputCity.value = center.city;
    //         inputState.value = center.state;
    //         inputZipCode.value = center.zipCode;
    //         inputPlaceId.value = center.placeId;

    //         console.log("Inside div onclick event.");
    //         console.log(center);

    //         // Hide Submit button for adding a new center...
    //         document.querySelector(".submitButton-add").hidden = true;

    //         // Show Save Changes button for updating a center...
    //         document.querySelector(".submitButton-edit").hidden = false;

    //         this.saveChangesButtonOnclick(center.id);

    //         // editButton.onclick = () => {
    //         //     event.preventDefault();
    //         //     fetch(`http://localhost:8080/api/centers/edit/` + center.id, {
    //         //         method: "PATCH",
    //         //         headers: {
    //         //             "Content-Type": "application/json"
    //         //         },
    //         //         body: JSON.stringify({
    //         //             name: inputName.value,
    //         //             streetAddress: inputStreetAddress.value,
    //         //             city: inputCity.value,
    //         //             state: inputState.value,
    //         //             zipCode: inputZipCode.value,
    //         //             placeId: inputPlaceId.value,
    //         //         })
    //         //     })
    //         //         .then(() => {
    //         //             this.listOfRecycleCenters();
    //         //         });
    //         // }


    // },

    addRecycleCenterSubmitButtonOnclick() {

        const inputName = document.querySelector(".location-form__input-name");
        const inputStreetAddress = document.querySelector(".location-form__input-street");
        const inputCity = document.querySelector(".location-form__input-city");
        const inputState = document.querySelector(".location-form__input-state");
        const inputZipCode = document.querySelector(".location-form__input-zip");
        const inputPlaceId = document.querySelector(".location-form__input-placeid");
        const submitButton = document.querySelector(".submitButton-add");

        submitButton.onclick = () => {
            event.preventDefault();
            fetch(`http://localhost:8080/api/centers/add`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: inputName.value,
                    streetAddress: inputStreetAddress.value,
                    city: inputCity.value,
                    state: inputState.value,
                    zipCode: inputZipCode.value,
                    placeId: inputPlaceId.value,
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(center => {
                    console.log(center);
                })
                .then(() => {
                    this.listOfRecycleCenters();
                });
        }

    }

}


