var apikey ="b25abf6e18262639c4d411b925801b5d"

var userInput = document.getElementById("input");
var searchBtn = document.getElementById("btn");

searchBtn.addEventListener("click", function(){

    console.log(userInput.value)
    getWeather(userInput.value)
});

function getWeather (city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid='+ apikey + '&units=imperial';

  fetch(requestUrl)
    .then(function (response) {
        console.log (response)
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      getForcast(data.coord.lat, data.coord.lon)
      var city = document.getElementById("city")
      city.textContent= data.name
    });
}

function getForcast (lat, lon) {
    
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ lon + '&appid=' + apikey + '&units=imperial';

fetch(requestUrl)
.then(function (response) {
    console.log (response)
  return response.json();
})
.then(function (data) {
  console.log(data)
  $()
});
}
