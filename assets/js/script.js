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


var searchForm = $("#search-form");

var searchInput = $("#search-input");

var searchButton = $("#search-button");

var searchHistory = $("#history");

var currentWeather = $("#today");

var forecast = $("#forecast");

var cityName = localStorage.getItem("cityName");

var cityArr = [];

const APIKey = "5350d0f7b1fc4bfd19dd68ba95e8ac1b";

var searchCity = "";

cityHistory();

$(searchButton).on("click", function (event) {
    event.preventDefault();
    searchCity = $(searchInput).val();
    if (cityArr.includes(searchCity) === true) { 
        alert("You have previously searched for this city, please select it from your history list");
        return;
    }
    cityArr.push(searchCity);
    localStorage.setItem("cityName", JSON.stringify(cityArr));
    renderButtons();
    getCurrentWeather();
    getForecast();
    searchInput.val("");
});

$("#history").on("click", "button", function (event) {
    event.preventDefault();
    var cityBtn = $(event.target);
    searchCity = cityBtn.attr("id");
    getCurrentWeather();
    getForecast();
})

$("#clearBtn").on("click", function () {
    clearStorage();
    $("#history").empty();
    $(currentWeather).empty();
    $(forecast).empty();
})

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
        var windSpeed = $("<p>").text("Wind: " + response.wind.speed + "m/s");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        $(cityCurrent).append(currentImage);
        $(currentWeather).append(cityCurrent, currentTemp, windSpeed, humidity);
    });
}

function getForecast() {
    $(forecast).empty();
    var fqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey + "&units=metric";
    $.ajax({
        url: fqueryURL,
        method: "GET"
    }).then(function (response) {
        var forecastTitle = $("<h1>").text("5-Day Forecast:");
        var forecastArea = $("<div>").attr("id", "forecastArea").addClass("col-lg-12 d-flex flex-row");
        $(forecast).append(forecastTitle, forecastArea);
        for (i = 0; i < 5; i++) {
            var localDate = moment.unix(response.list[((i + 1) * 8) - 1].dt + response.city.timezone).format("DD-MM-YYYY");
            var forecastCard = $("<div>").addClass("col-md-2 p-3 mx-2").attr("id", "forecastCard");
            var forecastDate = $("<h4>").text(localDate);
            var forecastImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png").attr("class", "justify-content-center");
            var forecastTemp = $("<p>").text("Temp: " + response.list[i].main.temp + " °C");
            var forecastWindspeed = $("<p>").text("Wind: " + response.list[i].wind.speed + "m/s");
            var forecastHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
            $(forecastCard).append(forecastDate, forecastImage, forecastTemp, forecastWindspeed, forecastHumidity);
            $(forecastArea).append(forecastCard);
        }
    });
}

function renderButtons() {
    $("#history").empty();
    for (i = 0; i < cityArr.length; i++) {
        var cityBtn = $("<button>").text(cityArr[i]).attr("id", cityArr[i]).addClass("btn btn-history my-1");
        $("#history").append(cityBtn);
    }
}
 
function cityHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("cityName"));
    if (searchHistory !== null) {
        cityArr = searchHistory;
    }
    renderButtons();
}

function clearStorage() {
    window.localStorage.clear();
}


