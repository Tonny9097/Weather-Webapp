document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const userInput = document.getElementById('search').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(userInput)}&appid=90dd95656528a344df003af9c94def9d`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const cityName = data.name;
            const country = data.sys.country; 
            document.getElementById('cityName').textContent = `${cityName}, ${country}`;

            const mainCondition = data.weather[0].main;
            document.getElementById('mainCondition').textContent = mainCondition;

            const iconCode = data.weather[0].icon; 
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const placeholderUrl = 'Assets/no-icon.png'; 


            let iconImg = document.getElementById('weatherIcon');
            iconImg.src = iconUrl;
            iconImg.alt = mainCondition;
            iconImg.style.display = 'block';

            iconImg.onerror = function() {
                this.src = placeholderUrl;
              };


            const mainDescription = data.weather[0].description;
            document.getElementById('mainDescription').textContent = mainDescription;


            const mainTemp = data.main.temp;
            const feelTemp = data.main.feels_like;

            document.getElementById('mainTemperature').textContent = mainTemp + " °C";
            document.getElementById('feelsTemp').textContent = feelTemp + " °C";

            const windSpeed = data.wind.speed;
            const windDir = data.wind.deg;

            document.getElementById('windSpeed').textContent = windSpeed + " kph";
            document.getElementById('degreeDir').textContent = windDir + " °";
          })

        

        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});