import  updateBackground  from './background.js';
const apiKey = '1b770f237929bb21c34412c090d06664';

let searchForm = $("#citySearchForm");
let cityInput = $("#cityInputLocation")
let searchButton = $("#search");
let currentWeatherContainer = $("#currentWeatherContainer");
let fiveDayContainer = $("#five-day-container");
let searchedCityButton = $("#savedCityButton");
let largeTypeFont = $("#largeType");
let additionalContent =$("#additionalContent");

// Set the default background on page load
document.addEventListener('DOMContentLoaded', () => {
  updateBackground('default'); 
});

//Get user location'
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  console.log(crd)
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  getWeatherData(crd.latitude, crd.longitude)
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options)


searchForm.on('submit', handleSearchCity);

// Load saved cities on page load
loadSavedCities();

//handle search city submission event 
function handleSearchCity(event){
    event.preventDefault();
console.log("cityInput:", cityInput.val())
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

    //limit cities to 4
    if(cities.length >= 4){
      cities.shift();
    }
    
    cities.push(cityName);
    localStorage.setItem('cities', JSON.stringify(cities));
    renderSavedCityButton(cityName);
  }
}

// Load saved cities from localStorage
function loadSavedCities() {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];

  cities = cities.slice(-4);
  searchedCityButton.empty();

  cities.forEach(city => {
    renderSavedCityButton(city);
  });
}

// Render saved city button
function renderSavedCityButton(cityName) {
  let cityButton = $('<button>')
    .addClass('saved-search-button btn btn-secondary w-100 my-1')
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
          console.log('current:', data);
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
          console.log('5 day:', data);
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
  largeTypeFont.empty();
  additionalContent.empty();

if (!currentWeather){
  alert("No current weather availale");
  return;
};
  let currentCard = $('<div>').addClass('current-card');
  let title = $('<h3>').addClass('title').text('Current')
  let temp = $('<h5>').text(Math.round(currentWeather.main.temp) + ' \u00B0f');
  let tempLabel = $('<h5>').addClass('label').text('temp')
  let feels = $('<h5>').text(Math.round(currentWeather.main.feels_like) + ' \u00B0f')
  let feelsLabel = $('<h5>').addClass('label').text('feels')
  let humid = $('<h5>').text(Math.round(currentWeather.main.humidity) + ' %');
  let humidLabel= $('<h5>').addClass('label').text('hum');
  let wind = $('<h5>').text(Math.round(currentWeather.wind.speed) + ' mph');
  let windLabel= $('<h5>').addClass('label').text('wind');
  let description = $('<h5>').text(currentWeather.weather[0].description);

  currentCard.append(
    title, 
    temp, 
    tempLabel, 
    feels, 
    feelsLabel, 
    wind, 
    windLabel, 
    humid, 
    humidLabel, 
    description,
  );

  currentWeatherContainer.append(currentCard);

  // Main font rendering in center 
  let largeType = $('<h1>').text(currentWeather.name)

  largeTypeFont.append(largeType)

  //Rendering of larege font temp and weather status on right 
  let contentCard = $('<div>').addClass('contentCard');
  let largeFontTemp = $('<h3>').text(Math.round(currentWeather.main.temp)).addClass('large-temp')
  let largeFontStatus =$('<h3>').text(currentWeather.weather[0].description).addClass('large-status')

  contentCard.append(largeFontTemp, largeFontStatus)
  additionalContent.append(contentCard)

  // Update the background image
  const weatherDescription = currentWeather.weather[0].description;
  updateBackground(weatherDescription);

};


function renderFiveDay(fiveDay){
  //clearing old forecast
  fiveDayContainer.empty();
  
  if (fiveDay.length === 0){
    alert("Five-Day forecast not  availale");
    return;
  };

  // Define days of the week array
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    //initialize empty array to hold data by day
    let dailyData = []
    //itterate through fiveday.list
    fiveDay.list.forEach(entry => {
      let date = entry.dt_txt.split(' ')[0]; 

      if (!dailyData[date]) {
          dailyData[date] = [];  
      }
      dailyData[date].push(entry);
  }    
);
console.log('Daily Data Group:',dailyData)

 // Extract the unique dates and skip the current day if it's included
 let uniqueDates = Object.keys(dailyData);
 if (uniqueDates.length > 5) {
     uniqueDates = uniqueDates.slice(1); 
 }

   // Initialize arrays to store data for chart rendering
   const tempMovements = [];
   

     //itterate through new array,  and append
  for(let i = 0; i < 5; i++){
    let date = uniqueDates[i]
    let dayEntries = dailyData[date];
    let tempMin = Math.min(...dayEntries.map(entry => entry.main.temp_min));
    let tempMax = Math.max(...dayEntries.map(entry => entry.main.temp_max));
    let dateObject= new Date(date);
    let dayOfWeek = daysOfWeek[dateObject.getDay()];

    // Add data to temperature arrays for chart rendering
    tempMovements.push(Math.round(tempMax));
    tempMovements.push(Math.round(tempMin));

    //Create card and contentcc
    let fiveDayCard = $("<div>").addClass("five-day-card shadow");
    let dayName = $('<h4>').text(dayOfWeek);
    let description = $('<h5>').addClass("h5-description").text(dayEntries[0].weather[0].description);
    let maxTemp = $('<h5>').text('hi ' + Math.round(tempMax) + ' \u00B0f');
    let minTemp = $('<h5>').text('low ' + Math.round(tempMin) + ' \u00B0f');
  

      //append children to fiveDayCard then append car to containter
      fiveDayCard.append(dayName, maxTemp, minTemp, description);
      fiveDayContainer.append(fiveDayCard);
 };

 
 //Render teh chart with data collected above
  renderTempChart( tempMovements)
};


let chartInstance = null;
// Function to render the temperature chart
function renderTempChart(tempMovements) {
   // Destroy the previous chart instance if it exists
   if (chartInstance) {
    chartInstance.destroy();
  }
  // Get the canvas element
  const ctx = document.getElementById('temperatureChart').getContext('2d');

  // Create the line chart
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array(tempMovements.length).fill(''), 
      datasets: [
        {
          label: '', 
          data: tempMovements,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          tension: 0.3, 
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false, 
        },
        tooltip: {
          enabled: false 
        }
      },
      scales: {
        x: {
          display: false, 
        },
        y: {
          display: false, 
        }
      }
    }
  });
}


$(document).ready(function() {
//click search
    searchButton.click(function(event) {
        console.log("Button clicked");
        handleSearchCity(event);
    });
});
