let searchForm = $("#citySearchForm");
let cityInput = $("#cityInputLocation")
let searchButton = $("#search");
let currentCityWeather = $("#currentCityWeather");
let fiveDayForecast = $("#5day");
let savedCityButton = $("#savedCityButton");
//handle search city submission event 
function handleSearchCity(event){
    event.preventDefault();

    let cityName = cityInput.val().trim()
    console.log(cityName);

    if (cityName) {
      getGeoData(cityName);
    } else {
      (cityName = "")
      alert("Please enter city name")
    }                              
};

// Function to converty city name to geo data

function getGeoData(cityName) {
    let geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=1b770f237929bb21c34412c090d06664';
    
    fetch(geoApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
    };

//function to fetch weather data with lat/long
function getWeatherData() {
    let weatherApiUrl ='https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=1b770f237929bb21c34412c090d06664&units=imperial';
    
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
});
