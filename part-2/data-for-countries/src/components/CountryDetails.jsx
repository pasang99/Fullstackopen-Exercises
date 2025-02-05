import React from 'react';

const CountryDetails = ({ country, weather }) => {
  if (!country) return <p>No country selected</p>;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages).join(", ")}</p>
      <img src={country.flags?.png} alt="Flag" width="100" /> {/* Ensure correct flag URL */}

      {weather && (
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
