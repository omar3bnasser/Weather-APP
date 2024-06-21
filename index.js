const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "27dc11a3fede334fb11494ffefa78144";

weatherForm.addEventListener("submit",async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeaterData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error) {
            console.error(error);
            displayError(error);
        }

    }else {
        displayError("please inter a city");
    }

});
async function getWeaterData(city){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error("could not fetch weather data");
        }
        return await response.json();
}
function displayWeatherInfo(data){
    const {name : city ,
        main : {temp, humidity},
        weather : [{description, id}]} = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `humidity: ${humidity}`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);




        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji")



        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
        console.log(data)
    }
function getWeatherEmoji(weatheId){
    switch (true){
        case (weatheId >= 200 && weatheId < 300):
            return "🌧";
            case (weatheId >= 300 && weatheId < 400):
            return "🌧";
            case (weatheId >= 500 && weatheId < 600):
            return "🌧";
            case (weatheId >= 600 && weatheId < 700):
            return "⛄";
            case (weatheId >= 700 && weatheId < 800):
            return "🌪";
            case (weatheId  === 800):
            return "🌞"
            case (weatheId >= 801 && weatheId < 810):
            return "☁";
            default : return "❓";
    }

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}