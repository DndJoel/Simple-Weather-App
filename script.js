//This makes the getWeather function so that when the button in the html files gets pressed the logic will run
function getWeather() {
    //The const apiKey will make a variable that cant be chnaged and thst will hold the API key
    const apiKey = 'cdf1957bcc2413636299ea50675f622c';
    //The getElementById function will find the element with the id 'city' and will get its value
    const city = document.getElementById('city').value;
    //If no text is inputted in the text feild it will throw an alert
    if (city === '') {
        alert('Please enter a city.');
        return;
    }

    //The const apiUrl will hold the url to the weather API with the inputted city and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

   //Fetch will send a GET request to the API URL to fetch the data on the weather of the city 
    fetch(apiUrl)
    //If the fetch request is successful it will return a promise that resolves to the response from the server

        //.then method is called when the fetch fulfilled its promise
        .then(response => {
            //If the response is not ok (for example, status code is not 200) it will throw an error
            if (!response.ok) {
                throw new Error('City not found');
            }
            //If the response is ok it will return the json data from the server
            return response.json();
        })
        //then.data will get the data from the response
        .then(data => {
            
            //The displayWeather function will take the data from the response and display it in the HTML
            displayWeather(data);
        })
        //catch method is called when the fetch promise rejects
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, an error occurred while fetching weather data.');
        });
}

//The displayWeather function will take all the data from the api response and display it in the HTML
function displayWeather(data)
{
    const weatherInfo = document.getElementById('weather-info');
    const city = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;


    //The weather.Info Element will display all the vaiables with their infromation using the .innerHTML property
    weatherInfo.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <h2>${city}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    
`;
}
