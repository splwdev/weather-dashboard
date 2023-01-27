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


var searchForm = $("#search-form");

var searchInput = $("#search-input");

var searchButton = $("#search-button");

var searchHistory = $("#history");

var currentWeather = $("#today");

var forecast = $("#forecast");

var cityName = localStorage.getItem("cityname");

var cityArr = [];

const APIKey = "5350d0f7b1fc4bfd19dd68ba95e8ac1b";

$(searchButton).on("click", function (event) {

    event.preventDefault();

  // Here we grab the text from the input box
    var searchCity = $(searchInput).val();
    console.log(searchCity);

  // Current Weather
    var cwqueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey + "&units=metric";
    $.ajax({
        url: cwqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var currentDate = moment.unix(response.dt + response.timezone).format("(DD/MM/YYYY) HH:mm:ss");
        var cityCurrent = $("<h1>").text(response.name + " " + currentDate);
        var currentImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        var currentTemp = $("<p>").text("Temperature: " + response.main.temp + " °C");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/s");
        $(currentWeather).append(cityCurrent, currentImage, currentTemp, humidity, windSpeed);
    });

    var fqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey + "&units=metric";
    $.ajax({
        url: fqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var forecastRow = $("<div>").addClass("row").attr("id", "forecastRow");
        $(forecast).append(forecastRow);
        for (i = 0; i < 5; i++) {
            var localDate = moment.unix(response.list[((i + 1) * 8) - 1].dt + response.city.timezone).format("DD-MM-YYYY");
            console.log(localDate);
            var forecastCard = $("<div>").addClass("col-sm-2 bg-primary");
            var forecastDate = $("<h2>").text(localDate);
            var forecastImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");
            var forecastTemp = $("<p>").text("Temperature: " + response.list[i].main.temp + " °C");
            var forecastHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
            var forecastWindspeed = $("<p>").text("Wind Speed: " + response.list[i].wind.speed + "m/s");
            $(forecastCard).append(forecastDate, forecastImage, forecastTemp, forecastHumidity, forecastWindspeed);
            $(forecastRow).append(forecastCard);
        }
    });
    
});


