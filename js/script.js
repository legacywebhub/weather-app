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

// function to search weather and update the dom
async function searchWeather(location) {
    weatherContainer.style.display = "none";

    const city = location || searchInput.value;
    const url = `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=01496641e8e04d3c4d8473dba298674b`;

    //loading text animation
    message.innerHTML =  '<img id="animation" src="images/loading.gif">';
    console.log("loading animation mounted.. About to fetch data");

    try {
        // fetching from API
        const ourRequest = await fetch(url);
        // converting our response from string to json format
        const data = await ourRequest.json();
        console.log("data fetched:", data);

        if (data.cod == "404") {
            // if city is not found or invalid city entered
            message.innerHTML = 'City not found or does not exist';
            console.log("Invalid city");
        } else {
            // if city is found
            console.log("City found. Updating the DOM..");

            // updating the DOM data
            iconContainer.innerHTML = `<img src="//openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            temperature.innerText = Math.round(data.main.temp - 273);
            pressure.innerText = data.main.pressure / 1000;
            humidy.innerText = Math.round(data.main.humidity);
            weather.innerText = data.weather[0].description;
            country.innerText = data.sys.country.toUpperCase();
            message.innerText = data.name.toUpperCase();

            // displaying DOM contents
            weatherContainer.style.display = "contents";

            console.log("DOM updated");

            // resetting our set input value
            searchInput.value = '';
        }

    } catch (err) { 
        // catching/handling errors
        setTimeout(()=>{
        console.log(err)
        message.innerText = 'Sorry there was an error while fetching weather data';
        weatherContainer.style.display = "none";
        }, 30000);
    }

}