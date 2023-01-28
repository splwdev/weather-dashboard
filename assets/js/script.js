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
    // add checks if city name isnt found in openweathermap db

// Global variables to be used as part of the application
var searchForm = $("#search-form");
var searchInput = $("#search-input");
var searchButton = $("#search-button");
var searchHistory = $("#history");
var currentWeather = $("#today");
var forecast = $("#forecast");
// Initialising local storge
var cityName = localStorage.getItem("cityName");
// Initialising array
var cityArr = [];
// API key
const APIKey = "5350d0f7b1fc4bfd19dd68ba95e8ac1b";
// Initialsing searchCity string
var searchCity = "";

// Recalling previous history
cityHistory();

// Search button event handler
$(searchButton).on("click", function (event) {
    event.preventDefault();
    searchCity = $(searchInput).val();
    // Checking to see if the user has already searched for the city
    if (cityArr.includes(searchCity) === true) { 
        alert("You have previously searched for this city, please select it from your history list");
        return;
    }
    // pushing searchCity input into the array, then adding the array data into local storage
    cityArr.push(searchCity);
    localStorage.setItem("cityName", JSON.stringify(cityArr));
    // hiding the landing page greeting
    $("#greeting").addClass("hide");
    renderButtons();
    getCurrentWeather();
    getForecast();
    searchInput.val("");
});

// event handler to display weather information for city button clicked on in history
$("#history").on("click", "button", function (event) {
    event.preventDefault();
    var cityBtn = $(event.target);
    searchCity = cityBtn.attr("id");
    getCurrentWeather();
    getForecast();
})

// event handler to clear local storage, array, and the screen
$("#clearBtn").on("click", function () {
    clearStorage();
    $("#history").empty();
    $(currentWeather).empty();
    $(forecast).empty();
})

// function to get current weather
function getCurrentWeather() {
    $(currentWeather).empty();
    var cwqueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey + "&units=metric";
    $.ajax({
        url: cwqueryURL,
        method: "GET"
    }).then(function (response) {
            var currentDate = moment.unix(response.dt + response.timezone).format("(DD/MM/YYYY)");
            var cityCurrent = $("<h1>").text(((response.name).charAt(0).toUpperCase() + (response.name).slice(1)) + " " + currentDate).attr("id", "cityName");
            var currentImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            var currentTemp = $("<p>").text(" Temp: " + response.main.temp + " °C").attr("class", "wi wi-thermometer");
            var windSpeed = $("<p>").text(" Wind: " + response.wind.speed + "m/s").attr("class", "wi wi-strong-wind");
            var humidity = $("<p>").text(" Humidity: " + response.main.humidity + "%").attr("class", "wi wi-humidity");
            $(cityCurrent).append(currentImage);
            $(currentWeather).append(cityCurrent, currentTemp, windSpeed, humidity);
    });
}

// function to get forecast
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
            // this line ensures that the weather is displayed for the same time each day for the forecast
            var localDate = moment.unix(response.list[((i + 1) * 8) - 1].dt + response.city.timezone).format("DD-MM-YYYY");
            var forecastCard = $("<div>").addClass("col-md-2 p-3 mx-2 rounded").attr("id", "forecastCard");
            var forecastDate = $("<h4>").text(localDate);
            var forecastImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png").attr("class", "justify-content-center");
            var forecastTemp = $("<p>").text(" Temp: " + response.list[i].main.temp + " °C").attr("class", "wi wi-thermometer");
            var forecastWindspeed = $("<p>").text(" Wind: " + response.list[i].wind.speed + "m/s").attr("class", "wi wi-strong-wind");
            var forecastHumidity = $("<p>").text(" Humidity: " + response.list[i].main.humidity + "%").attr("class", "wi wi-humidity");
            $(forecastCard).append(forecastDate, forecastImage, forecastTemp, forecastWindspeed, forecastHumidity);
            $(forecastArea).append(forecastCard);
        }
    });
}

// function to render the buttons for the city search history
function renderButtons() {
    $("#history").empty();
    for (i = 0; i < cityArr.length; i++) {
        var cityBtn = $("<button>").text((cityArr[i]).charAt(0).toUpperCase() + (cityArr[i]).slice(1)).attr("id", cityArr[i]).addClass("btn btn-history my-1");
        $("#history").append(cityBtn);
    }
}

// function to set the city array to the local storage data then render buttons
function cityHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("cityName"));
    if (searchHistory !== null) {
        cityArr = searchHistory;
    }
    renderButtons();
}

// function to clear storage
function clearStorage() {
    window.localStorage.clear();
    cityArr = [];
}
