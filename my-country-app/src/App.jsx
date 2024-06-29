// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import CountryDetails from './components/CountryDetails';
import LeafletMap from './components/LeafletMap';
import SearchBar from './components/SearchBar';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryDetails, setCountryDetails] = useState(null);

  const handleSearch = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setSelectedCountry(countryName);
        setCountryDetails(data[0]);
      } else {
        setSelectedCountry('');
        setCountryDetails(null);
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Country Information</h1>

      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="content-container">
        <div className="country-info">
          {countryDetails ? (
            <CountryDetails countryDetails={countryDetails} />
          ) : (
            <p>No country selected or data available.</p>
          )}
        </div>

        <div className="map-container">
          {countryDetails && countryDetails.latlng && (
            <LeafletMap
              countryName={countryDetails.name?.common}
              latlng={countryDetails.latlng}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
