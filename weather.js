const weather = document.querySelector(".js-weather")
const API_KEY = '';
const COORDS = 'coords';



// API fetch request
// changes inner text
function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`
    ).then(function(response) {
        return response.json()
    }).then(function(json){
        const temp = Math.floor(json.main.temp);
        weather.innerText = `${temp}°F`
    });
}


// Saves the COORDS as a stringify OBJECT in local storage
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}




// Selects the data retrieved from the askforcoords
// then saves the coords as a cords object
// then passes the latitude, and longitute into getWeather
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}
 


function handleGeoError(){
    console.log("cant access ur location");
}

// THIS RUNS THE ASK FOR THE LOCATION FUNCTION SO THIS WOULD BE MY ZIP CODE BABYYYY
// Then goes to handleGEOSUCCESS
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


// Check to see if coords are in local storage, if there isn't any coords in local storage you then go to 
// ask for coords

// IF there is coords, the coordinates are parsed and passed through to the get weather function
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    console.log(loadedCoords)
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}


// Start Here
function init(){
    loadCoords();
}

init();