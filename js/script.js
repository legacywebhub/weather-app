//Variables declarartions
const popular = document.getElementById("popular"),
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
function fetchingData() {
    message.textContent = "Fetching Data...";
    message.innerText = message.innerText.slice(0, index);
    index++;
    if(index > message.length) {
        index = 0;
    }
}

async function searchWeather(e, location) {
    e.preventDefault();
    setInterval(fetchingData(), 2000);

    const city = input.value || location;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01496641e8e04d3c4d8473dba298674b`;
           
    const ourRequest = await fetch(url);
    const data = await ourRequest.json();
    console.log(data);

    // updating the Dom 
    temperature.innerText = Math.round(data.main.temp - 273);
    pressure.innerText = Math.round(data.main.pressure);
    humidy.innerText = Math.round(data.main.humidity);
    weather.innerText = data.weather[0].description;
    message.innerText = data.name.toUpperCase(); 

    //determining weather icon to display in the DOM
    if (data.weather[0].main == "Sun") {
        iconContainer.innerHTML = '<i class="fas fa-cloud-sun fa-3x"></i>';
    } else if (data.weather[0].main == "Rain") {
        iconContainer.innerHTML = '<i class="fas fa-cloud-rain fa-3x"></i>';
    } else if (data.weather[0].main == "Clouds") {
        iconContainer.innerHTML = '<i class="fas fa-cloud fa-3x"></i>';
    }
    weatherContainer.style.display = "contents";
    input.value = '';
}
