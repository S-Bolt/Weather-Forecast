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

//Todo Function to converty city name to geo data

function getGeoData() {
    let geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Baltimore&limit=1&appid=1b770f237929bb21c34412c090d06664';
    
    fetch(geoApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
    };

//Todo function to fetch weather data with lat/long
function getWeatherData() {
    let weatherApiUrl ='https://api.openweathermap.org/data/2.5/forecast?lat=38&lon=-77&appid=1b770f237929bb21c34412c090d06664&units=imperial';
    
    fetch(weatherApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
    };

//Todo function to render

$(document).ready(function() {
//click search
    searchButton.click(function(event) {
        console.log("Button clicked");
        handleSearchCity(event);
    });

    getGeoData("Dallas");
    getWeatherData();
});
