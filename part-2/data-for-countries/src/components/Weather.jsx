import React from "react";

const Weather = ({ weather, capital }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt="Weather icon"
        style={{ width: "100px", height: "100px" }}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
