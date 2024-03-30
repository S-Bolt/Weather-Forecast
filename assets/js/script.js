let searchInput = $("#citySearchForm");
let searchButton = $("#search");
//handle search city submission event 
function handleSearchCity(event){
    event.preventDefault();

    let cityName = $("#cityInputLocation").val().trim()
    console.log(cityName);

    if (cityName === ''){
       alert("Please enter a city"); 
    } else {

        const searchedCity = {
            city: cityName,
        }

    console.log (searchedCity);

    let savedCities = JSON.parse(localStorage.getItem("savedCitiesKey")) || [];
    //checking if city exist already/if not add local storage
    let cityExist =false;
    for (let i =0; i < savedCities.length; i++) {
        if (savedCities[i].city === cityName){
            cityExist = true;
            console.log("city already exist");
            return;
        }
    } if (!cityExist) {
        savedCities.push(searchedCity);
        localStorage.setItem("savedCitiesKey", JSON.stringify(savedCities));
        console.log("City added to saved", searchedCity);
    } else{
        console.log("City already exist in saved ")
    }
 };
};

$(document).ready(function() {
//click search
    searchButton.click(function(event) {
        console.log("Button clicked");
        handleSearchCity(event);
    });
});