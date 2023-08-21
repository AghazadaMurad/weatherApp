const input = document.querySelector(".search-bar");

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const icon = document.querySelector(".icon");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const APIkey = "5c1e801a98de55b805c069472e3bdc3a";

const getdata = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    );
    if (!res.ok) {
      throw Error("City not found");
    } else {
      weather.classList.remove("loading");
      document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${city})`;
    }
    const data = await res.json();
    displayValue(data);
    console.log(data);
    console.log(data.weather[0].icon);
  } catch (err) {
    weather.classList.add("loading");
  }
};

const displayValue = (data) => {
  cityName.textContent = `Wheather in ${data.name}`;
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  humidity.textContent = `Humidity ${data.main.humidity}%`;
  wind.textContent = `Wind speed: ${data.wind.speed}km`;
};

input.addEventListener("input", (e) => {
  getdata(e.target.value);
});
