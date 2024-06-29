// src/components/CountryDetails.jsx
import React from 'react';
import './CountryDetails.css';

const CountryDetails = ({ countryDetails }) => {
  return (
    <div className="country-details">
      <h2>{countryDetails.name?.common}</h2>
      <div className="country-info">
        <div>
          <strong>Capital:</strong> {countryDetails.capital}
        </div>
        <div>
          <strong>Population:</strong> {countryDetails.population?.toLocaleString()}
        </div>
        <div>
          <strong>Area:</strong> {countryDetails.area?.toLocaleString()} sq. km
        </div>
        <div>
          <strong>Region:</strong> {countryDetails.region}
        </div>
        <div>
          <strong>Languages:</strong> {Object.values(countryDetails.languages)?.join(', ')}
        </div>
        <div>
          <strong>Currency:</strong> {countryDetails.currencies?.[0]?.name} ({countryDetails.currencies?.[0]?.symbol})
        </div>
        <div>
          <strong>Flag:</strong> <img src={countryDetails.flags?.svg} alt="Flag" className="flag" />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
