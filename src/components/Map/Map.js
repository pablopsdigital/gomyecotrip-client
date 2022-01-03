import React, { useState } from 'react';
import './Map.css';
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';

import Pins from './MapPin/MapPin';
import CityInfo from './MapPopUp/MapPopUp';
import CITIES from './data-cities.json';

const navStyle = {
  top: 0,
  left: 0,
  padding: '10px',
};

const scaleControlStyle = {
  bottom: 36,
  right: 0,
  padding: '10px',
};

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={setViewport}
        // eslint-disable-next-line no-undef
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Pins data={CITIES} onClick={setPopupInfo} />

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <CityInfo info={popupInfo} />
          </Popup>
        )}

        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </>
  );
}
