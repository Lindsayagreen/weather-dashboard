var apikey = "b25abf6e18262639c4d411b925801b5d";

var userInput = $("#input");
var searchBtn = $("#btn");
var currentHour = parseInt(dayjs().format("HH"));
var currentWeather = $("#currentWeather");
var searchResults = $("#searchResults");
var row2 = $("#row2");
var citySearches = JSON.parse(localStorage.getItem("citySearches")) || [];
searchBtn.on("click", function () {
  console.log(userInput.val());
  getWeather(userInput.val());
});

function getWeather(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apikey +
    "&units=imperial";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getForcast(data.coord.lat, data.coord.lon);
      var city = document.getElementById("city");
      city.textContent = data.name;
      currentWeather.empty();
      // localStorage.setItem('cityData', JSON.stringify(data.name));
      // var cityData = JSON.parse(local.storage.getItem)
      currentWeather.append(
        data.name +
          " (" +
          dayjs.unix(data.dt).format("MM/DD/YYYY") +
          ') <img src="https://openweathermap.org/img/wn/' +
          data.weather[0].icon +
          '@2x.png">'
      );
      currentWeather.append('<p class="styled-paragraph">Temperature: ' + data.main.temp + '</p>');
      currentWeather.append('<p class="styled-paragraph">Humidity: ' + data.main.humidity + '</p>');
      currentWeather.append('<p class="styled-paragraph">Wind: ' + data.wind.speed + '</p>');
      // var saveCityToLocalStorage = $('dataName')
      saveCityToLocalStorage(data.name);
    });
}

function getForcast(lat, lon) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apikey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      row2.empty();
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
          console.log(data.list[i]);
          row2.append(`<div class="col">
      <div class="card" id="monday">
        <div class="card-body">
          <h5 class="card-title">${dayjs
            .unix(data.list[i].dt)
            .format("MM/DD/YYYY")}</h5>
          <img src="https://openweathermap.org/img/wn/${
            data.list[i].weather[0].icon
          }@2x.png">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Humidity: <span class="humidity">${
              data.list[i].main.humidity
            }</span></li>
            <li class="list-group-item">Temperature:<span class="temperature">${
              data.list[i].main.temp
            }</span></li>
            <li class="list-group-item">Wind Speed: <span class="windspeed">${
              data.list[i].wind.speed
            }</span></li></li>
          </ul>
        </div>
      </div>
    </div>`);
        }
      }
    });
}

function saveCityToLocalStorage(cityName) {
  // Check if local storage is available in the browser
  if (typeof Storage !== "undefined") {
    // Get the existing array of city searches from local storage or initialize an empty array if it doesn't exist

    if (citySearches.includes(cityName) === false) {
      // Add the new city name to the array
      citySearches.push(cityName);

      // Save the updated array back to local storage
      localStorage.setItem("citySearches", JSON.stringify(citySearches));
      var btn = document.createElement("button");
      btn.textContent = cityName;
      btn.onclick = cityButton;
      $("#searchResults").append(btn);
    }
  } else {
    console.log("Local storage is not supported in this browser.");
  }
}
function cityButton() {
  console.log(this);
  getWeather(this.textContent);
}

for (i = 0; i < citySearches.length; i++) {
  var btn = document.createElement("button");
  btn.textContent = citySearches[i];
  btn.onclick = cityButton;
  $("#searchResults").append(btn);
}
