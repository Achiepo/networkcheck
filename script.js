  // Données temporaires pour la démo
const weatherData = {
    temperature: 22,
    condition: "Ensoleillé",
    city: "Abidjan",
    humidity: 65,
    windSpeed: 12,
    hourlyForecast: [
        { time: "00h", temp: 18 },
        { time: "03h", temp: 16 },
        { time: "06h", temp: 15 },
        { time: "09h", temp: 19 },
        { time: "12h", temp: 22 },
        { time: "15h", temp: 24 },
        { time: "18h", temp: 21 },
        { time: "21h", temp: 19 }
    ]
}

// Mise à jour des données météo
document.getElementById('cityName').textContent = weatherData.city;
document.getElementById('weatherCondition').textContent = weatherData.condition;
document.getElementById('temperature').textContent = `${weatherData.temperature}°C`;
document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
document.getElementById('windSpeed').textContent = `${weatherData.windSpeed} km/h`;

// Génération des prévisions horaires
const hourlyForecastContainer = document.getElementById('hourlyForecast');
weatherData.hourlyForecast.forEach(forecast => {
    const forecastElement = document.createElement('div');
    forecastElement.className = 'text-center';
    forecastElement.innerHTML = `
        <p class="text-sm opacity-80">${forecast.time}</p>
        <p class="text-lg font-semibold">${forecast.temp}°C</p>
    `;
    hourlyForecastContainer.appendChild(forecastElement);
});

// Gestion de la recherche
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        //la logique pour rechercher une ville
        console.log('Recherche pour:', searchInput.value);

        // Exemple de logique pour récupérer les données météo d'une ville
        const apiKey = '4305fdeeff227bdc1a27ba3c72b57ad4'; 
        const city = searchInput.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Effectuer la requête pour obtenir les données météo
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Mettre à jour l'interface avec les nouvelles données
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('weatherCondition').textContent = data.weather[0].description;
                document.getElementById('temperature').textContent = `${data.main.temp}°C`;
                document.getElementById('humidity').textContent = `${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `${data.wind.speed} km/h`;

                // Mettre à jour les prévisions horaires si vous avez ces données
               
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données météo :", error)
            })
    }
})
