// Declare variables for html elements
// function / event handler for search button
// buttons for search history (max 6)
    // saved to localstorage
    // click on history buttons bring up their current weather / forecast
// current weather view
    // ajax to connect to api
        // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        // get lat and long from api
        // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        // make next request to api
    // heading for city name
    // heading for date
    // img for icon
    // paragraph for temperature
    // paragraph for humidity
    // paragraph for wind speed
// forecast weather view
    // ajax to connect to api
        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    // 5 columns for 5 day forecast
    // heading for date
    // img for icon
    // paragraph for temperature
    // paragraph for humidity
    // paragraph for windspeed
// button to clear localstorage

// TODO
    // Local Storage + Buttons for history
    // CSS styles
    // event handlers


var searchForm = $("#search-form");

var searchInput = $("#search-input");

var searchButton = $("#search-button");

var searchHistory = $("#history");

var currentWeather = $("#today");

var forecast = $("#forecast");

var cityName = localStorage.getItem("cityname");

var cityArr = [];

const APIKey = "5350d0f7b1fc4bfd19dd68ba95e8ac1b";

var searchCity = "";
// Here we grab the text from the input box



$(searchButton).on("click", function (event) {
    event.preventDefault();
    searchCity = $(searchInput).val();
    getCurrentWeather();
    getForecast();
});

function getCurrentWeather() {
    $(currentWeather).empty();
    var cwqueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey + "&units=metric";
    $.ajax({
        url: cwqueryURL,
        method: "GET"
    }).then(function (response) {
        var currentDate = moment.unix(response.dt + response.timezone).format("(DD/MM/YYYY)");
        var cityCurrent = $("<h1>").text(response.name + " " + currentDate).attr("id", "cityName");
        var currentImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        var currentTemp = $("<p>").text("Temp: " + response.main.temp + " °C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/s");
        $(cityCurrent).append(currentImage);
        $(currentWeather).append(cityCurrent, currentTemp, humidity, windSpeed);
    });
}

function getForecast() {
    $(forecast).empty();
    var fqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey + "&units=metric";
    $.ajax({
        url: fqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (i = 0; i < 5; i++) {
            var localDate = moment.unix(response.list[((i + 1) * 8) - 1].dt + response.city.timezone).format("DD-MM-YYYY");
            console.log(localDate);
            var forecastCard = $("<div>").addClass("col-md-2 bg-primary p-3 mx-2").attr("id", "forecastCard");
            var forecastDate = $("<h4>").text(localDate);
            var forecastImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png").attr("class", "justify-content-center");

            var forecastTemp = $("<p>").text("Temp: " + response.list[i].main.temp + " °C");
            var forecastHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
            var forecastWindspeed = $("<p>").text("Wind Speed: " + response.list[i].wind.speed + "m/s");
            $(forecastCard).append(forecastDate, forecastImage, forecastTemp, forecastHumidity, forecastWindspeed);
            $(forecast).append(forecastCard);
        }
    });
}


