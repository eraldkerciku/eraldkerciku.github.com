// src/components/CountryDetails.jsx
import React, { useState, useEffect } from 'react';
import './CountryDetails.css'; // Import CSS file for styling

const CountryDetails = () => {
  const [countryName, setCountryName] = useState('');
  const [countryDetails, setCountryDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestedCountries, setSuggestedCountries] = useState([]);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (!countryName) return;

      setLoading(true);
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
          throw new Error('Country not found');
        }
        const data = await response.json();
        setCountryDetails(data[0]);
      } catch (error) {
        console.error('Error fetching country details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryName]);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();

    if (searchTerm.length >= 2) {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Countries not found');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        setSuggestedCountries(countries);
      } catch (error) {
        console.error('Error fetching suggested countries:', error.message);
      }
    } else {
      setSuggestedCountries([]);
    }
  };

  const handleSelectCountry = (selectedCountry) => {
    setCountryDetails(null); // Reset country details
    setCountryName(selectedCountry); // Set new country name
  };

  return (
    <div className="country-details-container">
      <h2>Country Information</h2>
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={handleSearchChange}
        value={countryName}
      />
      <ul className="suggested-countries">
        {suggestedCountries.map((country, index) => (
          <li key={index} onClick={() => handleSelectCountry(country)}>{country}</li>
        ))}
      </ul>

      {loading && <div className="loading">Loading...</div>}
      
      {countryDetails && (
        <div className="country-details">
          <h3>{countryDetails.name.common}</h3>
          <p><strong>Capital:</strong> {countryDetails.capital}</p>
          <p><strong>Population:</strong> {countryDetails.population}</p>
          {/* Add more details as needed */}
        </div>
      )}
      
      {!countryDetails && !loading && (
        <div className="no-country">No country selected or data available.</div>
      )}
    </div>
  );
};

export default CountryDetails;
