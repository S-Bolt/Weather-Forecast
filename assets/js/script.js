fetch('https://api.openweathermap.org/data/2.5/forecast?lat=38&lon=-77&units=imperial&appid=1b770f237929bb21c34412c090d06664', {
    method: 'GET', //GET is the default.
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error ,
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  'http://api.openweathermap.org/geo/1.0/direct?q=Baltimore&limit=1&appid=1b770f237929bb21c34412c090d06664'
  // AJAX call requires a third party library, jQuery lesson 5
$.ajax({
    url: requestUrl,
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Response \n-------------');
    console.log(response);
  });