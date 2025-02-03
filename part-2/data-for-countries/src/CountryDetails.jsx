import React from 'react';

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
    </div>
  );
};

export default CountryDetail;
