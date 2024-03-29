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


