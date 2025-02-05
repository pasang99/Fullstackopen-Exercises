import React from 'react';

const CountryList = ({ countries, handleCountryClick }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common} <button onClick={() => handleCountryClick(country.name.common)}>Show details</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
