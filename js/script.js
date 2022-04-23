//Variables declarartions
const popularLocations = document.getElementsByClassName('popular'),
    popular = document.getElementById("popular"),
    popularList = document.getElementById("popular-list"),
    other = document.getElementById("other-apps"),
    otherList = document.getElementById("other-list"),
    menu = document.getElementById("menu"),
    sideBar = document.getElementById("side-bar"),
    closeIcon = document.getElementById("close"),
    weatherContainer = document.getElementById("weather-details"),
    message = document.getElementById("message"),
    iconContainer = document.getElementById("weather-icon-container"),
    weather = document.getElementById("weather"),
    temperature = document.getElementById("temperature"),
    pressure = document.getElementById("pressure"),
    humidy = document.getElementById("humidity"),
    country = document.getElementById("country"),
    form = document.forms["my-form"],
    searchInput = form["city"];
let i = 0,
    txt = 'Loading...',
    speed = 50;

/* --------------- Code section --------------- */
// checking if popular locations were clicked
for (x = 0; x < popularLocations.length; x++) {
    popularLocations[x].addEventListener('click', (e)=>{
        let popularLocation = e.target.textContent.toLowerCase();
        searchWeather(popularLocation);
    })
}

//Event Listeners and onclicks
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    searchWeather();
});
menu.addEventListener('click', showSideBar);
closeIcon.addEventListener('click', closeSideBar);
popular.addEventListener('click', ()=>{popularList.classList.toggle("display-sub-list");});
other.addEventListener('click', ()=>{otherList.classList.toggle("display-sub-list");});


/* --------------- Functions --------------- */
//function to show sidebar
function showSideBar() {
    sideBar.style.right = "0rem";
    /* checks if sidebar is opened and closes the sidebar 
    when any part of the page outside the sidebar is clicked */
    if (sideBar.style.right == "0rem") {
        main = document.querySelector("main");
        main.addEventListener('click', closeSideBar);
    }
};

//function to close sidebar
function closeSideBar() {
    sideBar.style.right = "-100rem";
};

//function to display animation text while fetching data
function loadAnimation() {
    if (i < txt.length) {
      message.innerHTML += txt.charAt(i);
      i++;
      setTimeout(loadAnimation, speed);
    }
}

// function to search weather and update the dom
async function searchWeather(location) {
    weatherContainer.style.display = "none";

    const city = location || searchInput.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01496641e8e04d3c4d8473dba298674b`;

    //loading text animation
    message.innerHTML =  '';
    loadAnimation();

    try {
        // fetching from API
        const ourRequest = await fetch(url);
        // converting our response from string to json format
        const data = await ourRequest.json();
        console.log(data);

        // determining weather icon to display in the DOM
        if (data.weather[0].main == "Sun") {
            iconContainer.innerHTML = '<i class="fas fa-sun fa-3x"></i>';
        } else if (data.weather[0].main == "Rain") {
            iconContainer.innerHTML = '<i class="fas fa-cloud-rain fa-3x"></i>';
        } else if (data.weather[0].main == "Clouds") {
            iconContainer.innerHTML = '<i class="fas fa-cloud fa-3x"></i>';
        } else if (data.weather[0].main == "Clear") {
            iconContainer.innerHTML = '<i class="fa fa-sun fa-3x"></i>';
        } else if (data.weather[0].main == "Haze") {
            iconContainer.innerHTML = '<img src="images/haze.png" width="130">';
        } else if (data.weather[0].main == "Fog") {
            iconContainer.innerHTML = '<img src="images/fog.png" width="100">';
        } else if (data.weather[0].main == "Snow") {
            iconContainer.innerHTML = '<img src="images/snow.png" width="100">';
        } else if (data.weather[0].main == "Smoke") {
            iconContainer.innerHTML = '<img src="images/smoke.png" width="100">';
        } else {
            iconContainer.innerHTML = '';
        }

        // updating the DOM data
        temperature.innerText = Math.round(data.main.temp - 273);
        pressure.innerText = data.main.pressure / 1000;
        humidy.innerText = Math.round(data.main.humidity);
        weather.innerText = data.weather[0].description;
        country.innerText = data.sys.country.toUpperCase();

        // waiting for our animation to finish before displaying the DOM
        setTimeout(()=>{
            message.innerHTML =  '';
            message.innerText = data.name.toUpperCase();
            weatherContainer.style.display = "contents";
            searchInput.value = '';
        }, 3000);
    } catch (err) { // catching any error
        setTimeout(()=>{
        message.innerText =  '';
        message.innerText = 'Sorry there was an error while fetching weather data';
        weatherContainer.style.display = "none";
        }, 3000);
    }
    // resetting our animation variable
    i = 0;
}