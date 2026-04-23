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
  if (temp < 5) return "Mont + atkı 🧥";
  if (temp < 15) return "Ceket 🧥";
  if (temp < 25) return "T-shirt 👕";
  return "Şort + tişört 🩳";
}

function extraAdvice(weather) {
  const w = weather.toLowerCase();

  if (w.includes("rain")) return "☔ Şemsiye almayı unutma!";
  if (w.includes("snow")) return "❄️ Kalın giyin, kar var!";
  if (w.includes("clear")) return "😎 Güneşli, keyfini çıkar!";
  
  return "";
} 
function getLocationWeather() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        displayWeather(data);
      });
  });
}
