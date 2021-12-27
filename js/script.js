//Variables declarartions
const popular = document.getElementById("popular"),
    popularList = document.getElementById("popular-list"),
    other = document.getElementById("other-apps"),
    otherList = document.getElementById("other-list"),
    menu = document.getElementById("menu"),
    sideBar = document.getElementById("side-bar"),
    closeIcon = document.getElementById("close"),
    weatherSection = document.getElementById("section-2"),
    weatherData = document.getElementById("weather-details"),
    message = document.getElementById("message"),
    iconContainer = document.getElementById("weather-icon-container");
    name = document.getElementById("city-name"),
    weather = document.getElementById("weather"),
    temp = document.getElementById("temperature"),
    press = document.getElementById("pressure"),
    hum = document.getElementById("humidity"),
    form = document.forms["my-form"],
    input = form["city"];
let index = 0;

//Event Listeners and onclicks
form.addEventListener('submit', searchWeather);
menu.addEventListener('click', showSideBar);
closeIcon.addEventListener('click', closeSideBar);
popular.addEventListener('click', ()=>{popularList.classList.toggle("display-sub-list");});
other.addEventListener('click', ()=>{otherList.classList.toggle("display-sub-list");});




//Functions
function showSideBar() {
    sideBar.style.right = "0rem";
    if (sideBar.style.right == "0rem") {
        main = document.querySelector("main");
        main.addEventListener('click', closeSideBar);
    }
};


function closeSideBar() {
    sideBar.style.right = "-1000rem";
};


async function searchWeather(e, location) {
    e.preventDefault();

    setInterval(fetchingData, 100);

    setTimeout(ajaxCall, 5000);
}

async function ajaxCall(){
    const city = input.value || location;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01496641e8e04d3c4d8473dba298674b`;
    const ourRequest = await fetch(url);
    const data = ourRequest.json();

    console.log(data)

    // processWeather();
    message.style.display = "none";

    t = data.main.temp - 273;
    p = data.main.pressure / 1000;
    h = data.main.humidity;
    w = data.weather[0].description;
    console.log(data.weather[0].main);
    
    temp.innerText = Math.round(t);
    press.innerText = Math.round(p);
    hum.innerText = Math.round(h);
    weather.innerText = w;
    name.innerText = data.name.toUpperCase(); 

    if (data.weather[0].main == "Sun") {
        weatherIcon = document.createElement('i');
        weatherIcon.classList.add("fas fa-cloud-sun fa-3x");
        iconContainer.appendChild(weatherIcon);
        // weatherIcon = `<i class="fas fa-sun fa-3x"></i>`;
    } else if (data.weather[0].main == "Rain") {
        weatherIcon = document.createElement('i');
        weatherIcon.classList.add("fas fa-cloud-rain fa-3x");
        iconContainer.appendChild(weatherIcon);
        // weatherIcon = `<i class="fas fa-cloud-rain fa-3x"></i>`;
    } else if (data.weather[0].main == "Cloud") {
        weatherIcon = document.createElement('i');
        weatherIcon.classList.add("fas fa-cloud fa-3x");
        iconContainer.appendChild(weatherIcon);
        // weatherIcon = `<i class=\"fas fa-cloud fa-3x\"></i>`;
    }
    weatherData.style.display = "inline-block";
}

function fetchingData() {
    message.textContent = "Fetching Data...";
    message.innerText = message.innerText.slice(0, index);
    index++;
    if(index > message.length) {
        index = 0;
    }
}

// function processWeather() {

// }