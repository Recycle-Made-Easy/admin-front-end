module.exports = {

    GOOGLE_API_KEY() {
        return "AIzaSyAZpUBB7ZJkWZnjMIK7bscJVc_6km5D6O4";
    },

    EndPoints() {
        let endpoints = new Map();
        endpoints.set("get_all_centers", "http://localhost:8080/api/centers/");
        endpoints.set("get_centers_by_placeId", "http://localhost:8080/api/geo/placeId/"); // + placeId
        endpoints.set("get_list_of_cities", "http://localhost:8080/api/centers/cities");  
        endpoints.set("get_centers_by_city", "http://localhost:8080/api/centers/city/"); // + city name
        endpoints.set("get_filtered_centers", "http://localhost:8080/api/centers/filter/"); // + city name and array of category ids, or just + array of category ids
        return endpoints;
    },
    
    async LocalAreas() {
        let localAreas = [];
        await fetch("http://localhost:8080/api/geo/")
            .then(res => res.json())
            .then(function (data) {
                localAreas = data;
                });
        return localAreas;
    },

    ZipCodes() {
        let zipCodeMap = new Map();
        zipCodeMap.set("43201", "ChIJ9Rz24rWOOIgR3EEuL2Ge4oo");
        zipCodeMap.set("43206", "ChIJw6wuB5iIOIgRus0jBTvKLHo");
        zipCodeMap.set("43212", "ChIJOW2nsVCOOIgR0IzLWzB30l4");
        zipCodeMap.set("43215", "ChIJmRPPvRCGOIgRARpJZtkXzq0");
        zipCodeMap.set("43224", "ChIJj3ATYruLOIgRMmVSsRFsuQ0");
        return zipCodeMap;
    },

    async FetchData(endpoint) {
        let fetchedData = [];
        await fetch(endpoint)
            .then(res => res.json())
            .then(function (data) {
                fetchedData = data;
                });
        return fetchedData;
    }

}