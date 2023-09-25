import React from 'react';
import './Amenities.css';
import { BsCheck2Circle } from 'react-icons/bs';

export default function Amenities({ experience, ...props }) {
  const { amenities } = experience;
  // const amenitiesMock = [
  //   'Hiking',
  //   'Mobile camp',
  //   'Wildlife',
  //   'Great landscapes',
  //   'Exploration',
  //   'Group shuttle',
  // ];

  return (
    <div className="experience-page-amenities">
      <h3 className="title-section">Experience features</h3>
      <div className="amenities-list">
        {amenities.map((amenitie, index) => {
          return (
            <div key={index} className="amenities-item">
              <div className="icon-container">
                <BsCheck2Circle className="icon-amenities" />{' '}
              </div>
              <span>{amenitie}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
