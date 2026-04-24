const apiKey = "0026dd3bbc80d73b0294e8a0d95a0062"; 

function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weather-card").innerHTML = `<p>City not found ❌</p>`;
        return;
      }

      displayWeather(data);
    })
    .catch(error => {
      console.error(error);
      document.getElementById("weather-card").innerHTML = `<p>Error fetching data</p>`;
    });
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6);
  const weather = data.weather[0].main;
  const description = data.weather[0].description;
  const outfit = getOutfit(temp);
  const advice = extraAdvice(weather);

  const weatherEmoji = getWeatherEmoji(weather);
  const tempColor = getTempColor(temp);

  document.getElementById("weather-card").innerHTML = `
    <div class="wc-header">
      <div class="wc-emoji">${weatherEmoji}</div>
      <div class="wc-city">${data.name}</div>
      <div class="wc-desc">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
    </div>

    <div class="wc-temp-row">
      <span class="wc-temp" style="color:${tempColor}">${temp}°</span>
      <span class="wc-unit">C</span>
    </div>

    <div class="wc-stats">
      <div class="stat-pill">
        <div class="stat-label">Feels like</div>
        <div class="stat-value">${feelsLike}°</div>
      </div>
      <div class="stat-pill">
        <div class="stat-label">Humidity</div>
        <div class="stat-value">${humidity}%</div>
      </div>
      <div class="stat-pill">
        <div class="stat-label">Wind</div>
        <div class="stat-value">${windSpeed} km/h</div>
      </div>
    </div>

    <div class="wc-outfit">
      <span class="outfit-label">Outfit suggestion</span>
      <span class="outfit-value">${outfit}</span>
    </div>

    ${advice ? `<div class="wc-advice">${advice}</div>` : ''}
  `;

  document.getElementById("weather-card").style.display = "block";
}

function getWeatherEmoji(weather) {
  const w = weather.toLowerCase();
  if (w.includes("clear")) return "☀️";
  if (w.includes("cloud")) return "☁️";
  if (w.includes("rain")) return "🌧️";
  if (w.includes("snow")) return "❄️";
  if (w.includes("thunder")) return "⛈️";
  if (w.includes("mist") || w.includes("fog")) return "🌫️";
  return "🌡️";
}

function getTempColor(temp) {
  if (temp < 0) return "#93c5fd";
  if (temp < 10) return "#67e8f9";
  if (temp < 20) return "#6ee7b7";
  if (temp < 30) return "#fde68a";
  return "#fca5a5";
}

function getOutfit(temp) {
  if (temp < 5) return "Coat + Scarf 🧥";
  if (temp < 15) return "Jacket 🧥";
  if (temp < 25) return "T-shirt 👕";
  return "Shorts + T-shirt 🩳";
}

function extraAdvice(weather) {
  const w = weather.toLowerCase();

  if (w.includes("rain")) return "☔ Don't forget your umbrella!";
  if (w.includes("snow")) return "❄️ Dress warmly, there's snow!";
  if (w.includes("clear")) return "😎 It's sunny, enjoy it!";
  
  return "";
} 
function getLocationWeather() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => displayWeather(data));
    },
  (error) => {
  alert("Location permission denied or failed ❌");
}
  );
}
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
