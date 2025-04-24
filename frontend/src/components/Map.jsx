import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom icon for the marker
const homeIcon = new L.Icon({
  iconUrl: '/home.png',
  iconSize: [53, 53],
  iconAnchor: [26.5, 53],
  popupAnchor: [0, -53],
  className: 'home-marker'
});

const MapWrapper = styled.div`
  height: 600px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px 0 0 0;
  padding: 0;
`;

// Component for updating map location
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const map = useMap();

  useEffect(() => {
    map.invalidateSize(); // Force map to update its container size
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          map.flyTo([latitude, longitude], 13, {
            duration: 2,
            easeLinearity: 0.25
          });
          // After reaching the location, show controls and marker
          setTimeout(() => {
            setPosition([latitude, longitude]);
            setShowControls(true);
          }, 2000); // 2 seconds delay
        },
        (error) => {
          console.error("Error getting location:", error);
          // If geolocation fails, use default location
          map.flyTo([28.6139, 77.2090], 13, {
            duration: 2,
            easeLinearity: 0.25
          });
          // Show controls and marker at default location
          setTimeout(() => {
            setPosition([28.6139, 77.2090]);
            setShowControls(true);
          }, 2000); // 2 seconds delay
        }
      );
    }
  }, [map]);

  return (
    <>
      {showControls && <ZoomControl position="topleft" />}
      {position && <Marker position={position} icon={homeIcon} />}
    </>
  );
};

const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map; 