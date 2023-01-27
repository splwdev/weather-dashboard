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

// var searchCity = $(searchInput).val();
// console.log(searchCity);


const APIKey = "5350d0f7b1fc4bfd19dd68ba95e8ac1b";

// function currentWeather() {
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + APIKey;

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//     });
// };

// currentWeather();

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
        var currentDate = moment.unix(response.dt).format("(DD/MM/YYYY)");
        var cityCurrent = $("<h1>").text(response.name + " " + currentDate);
        var currentImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        var currentTemp = $("<p>").text("Temperature: " + response.main.temp + " Degrees Celsius");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
        var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + "m/s");
        $(currentWeather).append(cityCurrent, currentImage, currentTemp, humidity, windSpeed);
    });
    
});


