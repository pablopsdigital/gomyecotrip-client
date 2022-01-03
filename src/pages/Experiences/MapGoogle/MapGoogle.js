import React, {useCallback, useState} from 'react';
import './MapGoogle.css';

import {
  GoogleMap,
  useJsApiLoader,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  InfoBox
} from '@react-google-maps/api';
import {Button} from '../../../components/Button';
import customStyleMap from './customStyleMap';

import {Link, useParams} from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 135px)'
};

export default function MapGoogle({experiences, ...props}) {
  //=================================================================
  //Read params data url
  //=================================================================
  const params = useParams();
  const {location, date, hour} = params;

  //=================================================================
  //Configure params and data map
  //=================================================================
  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  });

  const [map, setMap] = useState(null);
  const [selectMarker, setSelectedMarker] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //=================================================================
  //Render
  //=================================================================
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: 40,
        lng: -5
      }}
      options={{
        styles: customStyleMap.gomyecotripStyleMapClay,
        // disableDefaultUI: true,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM
        },
        gestureHandling: 'greedy'
      }}
      zoom={6}
      onUnmount={onUnmount}
    >
      {experiences.map((experience) => (
        <Marker
          key={experience._id}
          position={{
            lat: experience.address.lat,
            lng: experience.address.lng
          }}
          label={{
            text: `${experience.ratesForPerson.adults}`,
            className: 'marker-label'
          }}
          onClick={() => {
            setSelectedMarker(experience);
          }}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            strokeColor: '#53268f',
            fillColor: '#53268f',
            fillOpacity: 1,
            strokeWeight: 1,
            scale: 7
          }}
        ></Marker>
      ))}

      {selectMarker && (
        <InfoWindow
          position={{
            lat: selectMarker.address.lat,
            lng: selectMarker.address.lng
          }}
        >
          <div className="map-card-info">
            <div className="map-card-header">
              <img src={selectMarker.featuredImage} alt={selectMarker.name} />
            </div>

            <div className="map-card-body">
              <p>{selectMarker.address.address}</p>
              <h1>{selectMarker.name}</h1>
              <p>sinse {selectMarker.ratesForPerson.adults} €/person</p>
              <Link
                target="_blank"
                to={`/experience/${selectMarker._id}/${location}/${date}/${hour}`}
              >
                <Button outline>Reserve</Button>
              </Link>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}
