import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './CountryList';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => setQuery(e.target.value);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => setCountries(response.data))
        .catch((error) => console.error('Error fetching countries:', error));
    }
  }, [query]);

  const handleShowDetails = (countryName, capital) => {
    const country = countries.find((c) => c.name.common === countryName);
    setSelectedCountry(country);
  };

  return (
    <div className="App">
      <h1>Country Information</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a country"
      />
      {error && <p>{error}</p>}
      <div>
        {countries.length > 10 ? (
          <p>Too many matches, please specify further</p>
        ) : countries.length > 1 ? (
          <CountryList countries={countries} handleShowDetails={handleShowDetails} />
        ) : selectedCountry ? (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital[0]}</p>
            <p>Area: {selectedCountry.area} km²</p>
            <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
            <img src={selectedCountry.flags[0]} alt="Flag" width="100" />
          </div>
        ) : (
          <p>No country found</p>
        )}
      </div>
    </div>
  );
};

export default App;
