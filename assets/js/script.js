const apiKey = '1b770f237929bb21c34412c090d06664';

let searchForm = $("#citySearchForm");
let cityInput = $("#cityInputLocation")
let searchButton = $("#search");
let currentWeatherContainer = $("#currentWeatherContainer");
let fiveDayContainer = $("#5day");
let searchedCityButton = $("#savedCityButton");

searchButton.on('click', handleSearchCity);

// Load saved cities on page load
loadSavedCities();

//handle search city submission event 
function handleSearchCity(event){
    event.preventDefault();

    let cityName = cityInput.val().trim()
    console.log(cityName);

    if (cityName) {
      getGeoData(cityName);
      saveCity(cityName);

    } else {
      alert("Please enter city name")
    }                              
};

// Save city to localStorage
function saveCity(cityName){
  let cities = JSON.parse(localStorage.getItem('cities')) || []

  if (!cities.includes(cityName)) {
    cities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(cities));
    renderSavedCityButton(cityName);
  }
}

// Load saved cities from localStorage
function loadSavedCities() {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  cities.forEach(city => {
    renderSavedCityButton(city);
  });
}

// Render saved city button
function renderSavedCityButton(cityName) {
  let cityButton = $('<button>')
    .addClass('btn btn-secondary w-100 my-1')
    .text(cityName)
    .on('click', function() {
      getGeoData(cityName);
    });

  searchedCityButton.append(cityButton);
}


// Function to converty city name to geo data
function getGeoData(cityName) {
    let geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=1b770f237929bb21c34412c090d06664';
    
    fetch(geoApiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data){
            if (data.length> 0) {
              //preview 0 you find lat/lon
              let latitude = data[0].lat;
              let longitude = data[0].lon;
              getWeatherData(latitude,longitude);
            };
          });
        } else {
          alert("Error: " + response.statusText);
        }     
      });
    };

//function to fetch weather data with lat/long
function getWeatherData(latitude,longitude) {
  //current day
  let currentApiUrl ='https://api.openweathermap.org/data/2.5/weather?lat=' +latitude + '&lon=' + longitude +'&units=imperial&appid=1b770f237929bb21c34412c090d06664';

  fetch(currentApiUrl)
      .then(function (response) {
       if (response.ok){
          response.json().then(function (data){
          console.log(data);
          renderCurrent(data);

        })
       } else {
        alert("Error: " + response.statusText);
      };     
      });
  
  //5day
    let fiveDayApiUrl ='https://api.openweathermap.org/data/2.5/forecast?lat=' +latitude + '&lon=' + longitude +'&units=imperial&appid=1b770f237929bb21c34412c090d06664';
    
    fetch(fiveDayApiUrl)
      .then(function (response) {
       if (response.ok){
          response.json().then(function (data){
          console.log(data);
          renderFiveDay(data);
        })
       } else {
        alert("Error: " + response.statusText);
      }  ;   
      });
      
 };
 

//Todo function to render
function renderCurrent(currentWeather){
 //clearing old cards
  currentWeatherContainer.empty();

if (!currentWeather){
  alert("No current weather availale");
  return;
};
  let currentCard = $('<div>').addClass('current-card');
  let cityName = $('<h2>').text(currentWeather.name);
  let iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
  let icon = $('<img>').attr('src', iconUrl).addClass('weather-icon');
  let description = $('<h4>').text(currentWeather.weather[0].description);
  let temp = $('<h5>').text('Temp: ' + currentWeather.main.temp + ' F');
  let humid = $('<h5>').text('Humidity: ' + currentWeather.main.humidity + ' %');
  let wind = $('<h5>').text('Wind Speed: ' + currentWeather.wind.speed + ' mph');

  currentCard.append(cityName, icon, description, temp, humid, wind);
  currentWeatherContainer.append(currentCard);

//need to come back and add date, icon, and figure out how to make icon switch
};

function renderFiveDay(fiveDay){
  //clearing old forecast
  fiveDayContainer.empty();
  if (fiveDay.length === 0){
    alert("Five-Day forecast not  availale");
    return;
  };
    //initialize empty array to hold 5 day forecast
    let fiveDayForecast = []
    //itterate through fiveday.list
 for (let i = 5; i < fiveDay.list.length; i += 8 ) {
    let dayForecast = fiveDay.list[i];
    fiveDayForecast.push(dayForecast);
    };

  console.log(fiveDayForecast);

   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     //itterate through new array, fiveDayForecast and append
  for (let i = 0; i <fiveDayForecast.length; i++){

    // Get the date from the API data and convert it to a day of the week
    let dateStr = fiveDayForecast[i].dt_txt.split(' ')[0]; 
    let date = new Date(dateStr);
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfWeek = daysOfWeek[date.getDay()];

    let fiveDayCard = $("<div>").addClass("five-day-card flex-grow-1 mx-3");
    let iconUrl = `https://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}@2x.png`;
    let icon = $('<img>').attr('src', iconUrl).addClass('weather-icon');
    let dayName = $('<h4>').text(dayOfWeek);
    let description = $('<h5>').text(fiveDayForecast[i].weather[0].description);
    let temp = $('<h5>').text('Temp: ' + fiveDayForecast[i].main.temp + ' F');
    let humid = $('<h5>').text('Humidity: ' + fiveDayForecast[i].main.humidity + ' %');
    let wind = $('<h5>').text('Wind Speed: ' + fiveDayForecast[i].wind.speed + ' mph');

      //append children to fiveDayCard then append car to containter
      fiveDayCard.append(dayName, icon, description, temp, humid, wind);
      fiveDayContainer.append(fiveDayCard);
 };
};

  
 
  
   

//TODO render previous searches as button on left column

$(document).ready(function() {
//click search
    searchButton.click(function(event) {
        console.log("Button clicked");
        handleSearchCity(event);
    });
});
