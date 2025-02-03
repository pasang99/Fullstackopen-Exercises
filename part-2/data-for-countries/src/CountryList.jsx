import React, { useState } from 'react';

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Function to handle the button click and show country details
  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common} 
            <button onClick={() => handleShowDetails(country)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <img src={selectedCountry.flags.svg} alt={`Flag of ${selectedCountry.name.common}`} />
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default CountryList;
