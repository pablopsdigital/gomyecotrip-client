import React, {useEffect, useRef, useState} from 'react';
import {LoadScript, GoogleMap, StandaloneSearchBox, Marker} from '@react-google-maps/api';
import LoadingBox from '../../../../components/LoadingBox/LoadingBox';
import './MapLocation.scss';
import {Button} from '../../../../components/Button';
import MessageBox from '../../../../components/MessageBox/MessageBox';

const libs = ['places'];
const defaultLocation = {lat: 41.3873974, lng: 2.168568};

export default function MapLocation({updateAddress, props}) {
  const googleMapKey = process.env.REACT_APP_GOOGLE_KEY;
  const [mapActive, setMapActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const resetError = () => setError(null);

  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);
  const [address, setAddress] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setMapActive(true);
      getUserCurrentLocation();
    }, 100);
    return () => {
      window.clearTimeout(t);
    };
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng()
    });
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({lat: place.lat(), lng: place.lng()});
    setLocation({lat: place.lat(), lng: place.lng()});
  };
  const onConfirm = (event) => {
    resetError();

    event.preventDefault();
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      setAddress({
        lat: location.lat,
        lng: location.lng,
        address: places[0].formatted_address,
        name: places[0].name,
        vicinity: places[0].vicinity,
        googleAddressId: places[0].id
      });
    } else {
      setError('Please enter your address');
    }
  };

  useEffect(() => {
    updateAddress(address);
  }, [onConfirm]);

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation os not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  };

  return (
    <div id="map-location">
      {mapActive && (
        <LoadScript libraries={libs} googleMapsApiKey={googleMapKey}>
          <StandaloneSearchBox onLoad={onLoadPlaces} onPlacesChanged={onPlacesChanged}>
            <div className="map-input">
              <input type="text" placeholder="Enter your address"></input>
              <button onClick={onConfirm}>Confirm place</button>
            </div>
          </StandaloneSearchBox>
          <GoogleMap
            id="smaple-map"
            mapContainerStyle={{height: '100%', width: '100%', marginBottom: '100px'}}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onIdle={onIdle}
          >
            <Marker position={location} onLoad={onMarkerLoad}></Marker>
          </GoogleMap>
        </LoadScript>
      )}
      {error && (
        <MessageBox reset={resetError} severity="error">
          {error}
        </MessageBox>
      )}
    </div>
  );
}
