// src/components/RegionCountries.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RegionCountries.css';

const RegionCountries = ({ region }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchRegionCountries = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await response.json();
      setCountries(data);
    };

    fetchRegionCountries();
  }, [region]);

  return (
    <div className="region-countries">
      <h2>Countries in {region}</h2>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

RegionCountries.propTypes = {
  region: PropTypes.string.isRequired,
};

export default RegionCountries;
