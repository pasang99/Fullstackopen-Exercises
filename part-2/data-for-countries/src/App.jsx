import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const api_key = import.meta.env.VITE_WEATHER_API_KEY; // Ensure this is correct

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") return;

      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
        setCountries(response.data);
        setSelectedCountry(null);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    const fetchWeather = async (capital) => {
      if (!capital) return;

      console.log("Fetching weather for capital:", capital); // Log capital value

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        );
        console.log("Weather data:", response.data); // Log the response to check
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setErrorMessage("Error fetching weather data. Please try again later.");
      }
    };

    if (selectedCountry && selectedCountry.capital) {
      fetchWeather(selectedCountry.capital[0]); // Ensure this is correct
    }
  }, [selectedCountry]);

  const handleSearchChange = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Only call preventDefault if it's a valid event
    }
    setSearchTerm(e.target.value);
  };
  

  const handleCountryClick = async (countryName) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      setSelectedCountry(response.data[0]);
      setWeather(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching country details:", error);
      setErrorMessage("Error fetching country details. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Country Search</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      {errorMessage && <p>{errorMessage}</p>}
      <CountryList countries={countries} handleCountryClick={handleCountryClick} />
      <CountryDetails country={selectedCountry} weather={weather} />
    </div>
  );
};

export default App;
