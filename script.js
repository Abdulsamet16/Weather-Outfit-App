const apiKey="0026dd3bbc80d73b0294e8a0d95a0062";

function getWeather() {
  const city = document.getElementById("cityInput").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      displayWeather(data);
    });
}

function displayWeather(data)
{
    const temp=data.main.temp;
    const weather=data.weather[0].main;

    document.getElementById("result").innerHTML= `
    <p>Temperature: ${temp}°C</p>
    <p>Condition: ${weather}</p>
  `;
}
function getOutfit(temp) {
  if (temp < 5) return "Mont + atkı 🧥";
  if (temp < 15) return "Ceket 🧥";
  if (temp < 25) return "T-shirt 👕";
  return "Şort + tişört 🩳";
}
const outfit = getOutfit(temp);

function extraAdvice(weather) {
  if (weather.toLowerCase().includes("rain")) {
    return "Şemsiye al ☔";
  }
  return "";
}
const advice = extraAdvice(weather);