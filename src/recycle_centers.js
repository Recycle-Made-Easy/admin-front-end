const UserPage = require("./user_page");

module.exports = {

    displayRecycleCentersPage() {

        const wrapper = document.createElement("wrapper");
        wrapper.classList.add("flex-wrapper-outer");

        document.querySelector(".content-wrapper").append(wrapper);

        const wrapperContainer = document.createElement("wrapper");
        wrapperContainer.classList.add("location-form__container");
        wrapper.append(wrapperContainer);

        const fieldSet = document.createElement("fieldset");
        fieldSet.classList.add("location-form__fieldset");
        wrapperContainer.append(fieldSet);

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
        
        // const byTown = document.createElement("label");
        // byTown.innerHTML = "By town";
        // byTown.classList.add("by-town");
        // locationFormField.append(byTown);

        // const selectContainer = document.createElement("div");
        // selectContainer.classList.add("dropdown-select");
        // locationFormField.append(selectContainer);

        // UserPage.localAreaDropdown();

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

    

        const submitButton = document.createElement("button");
        submitButton.classList.add("submitButton");
        submitButton.innerHTML = "Submit";
        locationFormField.append(submitButton);

        submitButton.onclick = () => {
            event.preventDefault();
            fetch(`http://localhost:8080/api/centers/add`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: inputLocationName.value,
                    streetAddress: inputLocationStreetAddress.value,
                    city: inputLocationCity.value,
                    state: inputLocationState.value,
                    zipCode: inputLocationZipCode.value
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(center => {
                    console.log(center);
                });

        }


        

    }

}


