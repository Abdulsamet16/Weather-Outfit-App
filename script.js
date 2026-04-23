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
        document.getElementById("result").innerHTML = `<p>City not found ❌</p>`;
        return;
      }

      displayWeather(data);
    })
    .catch(error => {
      console.error(error);
      document.getElementById("result").innerHTML = `<p>Error fetching data</p>`;
    });
}

function displayWeather(data) {
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const weather = data.weather[0].main;

  const outfit = getOutfit(temp);
  const advice = extraAdvice(weather);

  document.getElementById("result").innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>🤔 Feels like: ${feelsLike}°C</p>
    <p>☁️ Condition: ${weather}</p>
    <p>👕 Outfit: ${outfit}</p>
    <p>${advice}</p>
  `;
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
  console.log("GEO ERROR:", error);

  alert(
    "Error: " + error.message +
    "\nCode: " + error.code
  );
}
  );
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
