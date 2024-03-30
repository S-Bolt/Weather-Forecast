let searchInput = $("#citySearchForm");
let searchButton = $("#search")
//handle submission event 
searchInput.submit(function(event){
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

let savedCities =JSON.parse(localStorage.getItem("cityNameKey"));
//defines savedCities as empty array, else will throw error
if (!Array.isArray(savedCities)) {
    savedCities = [];
};
savedCities.push(searchedCity);
localStorage.setItem("savedCitiesKey",JSON.stringify(savedCities));

    console.log("saved cities:", savedCities);
        //clearing search input
        $("#cityInputLocation").val('');
    }
});
