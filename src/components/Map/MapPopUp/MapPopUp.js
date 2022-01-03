import React from 'react';
import { Link } from 'react-router-dom';

function CityInfo(props) {
  const { info } = props;
  const displayName = `${info.city}, ${info.state}`;

  return (
    <div className="map-location">
      <div className="map-popup">
        <Link to={displayName}>Wikipedia</Link>
      </div>
      <img width={240} src={info.image} />
    </div>
  );
}

export default React.memo(CityInfo);
