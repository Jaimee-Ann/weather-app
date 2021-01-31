function showWeatherCondition(response) {
  celsiusTemp = response.data.main.temp;
    document.querySelector("#cityHeader").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      celsiusTemp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed * 3.6
    );
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", response.data.weather[0].icon);
}


  function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return`${day} ${formatHours(timestamp)}`;  
  }

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
    
  }
  return `${hours}:${minutes}`;
}


  
function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 6; index++) {
  let forecast = (response.data.list[index]);
  forecastElement.innerHTML = `
  <div class="row">
    <div class="col-12 col-md-2 mb-3">
      <div class="card">
        <div class="card-body">
          <p class="card-text">${formatHours(forecast.dt * 1000)}</p>
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          alt=" "
          id="icon"
          />
          <h5 class="card-text">${Math.round(forecast.main.temp_min)}° <strong>${Math.round(forecast.main.temp_max)}°</strong></h5>
        </div>
      </div>
    </div>
  `;  
}
}

  function search(city) {
    let apiKey = "8aed1bf91e607b096a113c2dd8fde03b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeatherCondition);

    apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(displayForecast);
  }
  
  function liveSearch(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    search(city);
  }
  
  function searchCurrentLocation(position) {
    let apiKey = "8aed1bf91e607b096a113c2dd8fde03b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeatherCondition);
  }
  
  function displayCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchCurrentLocation);
  }
  let celsiusTemp = null;
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    temperature = Number(temperature);
    temperatureElement.innerHTML = fTemp;

  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }
   // Date & Time
   let dateElement = document.querySelector("#todayDate");
   let currentTime = new Date();
   let hours = currentTime.getHours();
   if (hours < 10) {
     hours = `0${hours}`;
   }
   let minutes = currentTime.getMinutes();
   if (minutes < 10) {
     minutes = `0${minutes}`;
   }
   let dayIndex = currentTime.getDay();
   let days = [
     "Sunday",
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
     "Friday",
     "Saturday"
   ];
   dateElement.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

  // Search engine
  let searchForm = document.querySelector("#searchBar");
  searchForm.addEventListener("submit", liveSearch);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", displayCurrentLocation);
  
  //Temperature
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
  let iconElement = document.querySelector("#icon");
  

  search("Melbourne");
  