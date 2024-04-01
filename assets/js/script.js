const apiKey = '1b770f237929bb21c34412c090d06664';
let searchForm = $("#citySearchForm");
let cityInput = $("#cityInputLocation")
let searchButton = $("#search");
let currentWeatherContainer = $("#currentWeatherContainer");
let fiveDayContainer = $("#5day");
let savedCityButton = $("#savedCityButton");
//handle search city submission event 
function handleSearchCity(event){
    event.preventDefault();

    let cityName = cityInput.val().trim()
    console.log(cityName);

    if (cityName) {
      getGeoData(cityName);

      //searchForm.textContent ='';
      //cityInput.textContent = '';

    } else {
      alert("Please enter city name")
    }                              
};

// Function to converty city name to geo data

function getGeoData(cityName) {
    let geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=1b770f237929bb21c34412c090d06664';
    
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
  let currentCard = $('<h1>').text(currentWeather.name);

  let temp = $('<h5>').text('Temp: ' + currentWeather.main.temp + ' F');
  let humid = $('<h5>').text('Humidity: ' + currentWeather.main.humidity + ' %');
  let wind = $('<h5>').text('Wind Speed: ' + currentWeather.wind.speed + ' mph');

  currentCard.append(temp, humid, wind);

  currentWeatherContainer.append(currentCard);

//need to come back and add date, icon, and figure out how to make icon switch
};

function renderFiveDay(fiveDay){
  if (fiveDay.length === 0){
    alert("Five-Day forecast not  availale");
    return;
  };

    let fiveDayForecast = []
    
 for (let i = 7; i < fiveDay.list.length; i += 8 ) {
    let dayForecast = fiveDay.list[i];
    console.log(dayForecast[i]);
    fiveDayForecast.push(dayForecast);
    
  };
  console.log(fiveDayForecast);
     
  for (let i = 0; i <fiveDayForecast.lenghth; i++){


      let fiveDayCard = $("<h4>").addClass("flex-grow-1 big-info mx-3").text("hi");


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
