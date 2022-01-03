import React from 'react';
import './Features.css';
import {RiHeartPulseLine} from 'react-icons/ri';

export default function Features(props) {
  const featuress = [
    {
      title: 'Physical condition',
      description: 'This trip requires a good physical condition.'
    },
    {
      title: 'Accompanied kids',
      description: 'Less than 18 kids should be accompanied by an adult.'
    },
    {
      title: 'Outstanding reviews',
      description: 'This host has received a lot of positive reviews.'
    },
    {
      title: 'Basic rules',
      description: 'There are some basic rules you need to observe.'
    }
  ];

  return (
    <>
      <div className="experience-page-features">
        {featuress.map((feature, index) => {
          return (
            <div key={index} className="feature">
              {/* <RiHeartPulseLine className="icon-feature" /> */}
              <div className="content">
                <span>{feature.title}</span>
                <span>{feature.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
