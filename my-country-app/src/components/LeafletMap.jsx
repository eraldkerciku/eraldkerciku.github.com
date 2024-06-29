// src/components/LeafletMap.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ countryName, latlng }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if latlng is available
    if (latlng && latlng.length === 2) {
      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView(latlng, 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance.current);

        L.marker(latlng).addTo(mapInstance.current)
          .bindPopup(countryName)
          .openPopup();
      }
    }

    // Clean up map instance if latlng is not available
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [countryName, latlng]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
};

export default LeafletMap;
