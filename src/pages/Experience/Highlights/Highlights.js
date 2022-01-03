import React from 'react';
import './Highlights.css';
import {RiHeartPulseLine} from 'react-icons/ri';
import {Link} from 'react-router-dom';
import {ReactReduxContext} from 'react-redux';

export default function Highlights(props) {
  const highlightListMock = [
    {
      title: 'Trained leader',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Murenam te accusante defenderem. Ipse Epicurus fortasse redderet, utSextus Peducaeus, Sex.',
      url: ''
    },
    {
      title: 'First aid',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Murenam te accusante defenderem. Ipse Epicurus fortasse redderet, utSextus Peducaeus, Sex.',
      url: ''
    },
    {
      title: 'Emergency rescue',
      description:
        ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Murenam te accusante defenderem. Ipse Epicurus fortasse redderet, utSextus Peducaeus, Sex.',
      url: ''
    }
  ];

  return (
    <div className="experience-page-highlights">
      <h3 className="title-section">Trip highlights</h3>
      <div className="highlight-boxes">
        <div className="highlight-boxes-columns">
          {highlightListMock.map((item, index) => {
            return (
              <div key={index} className="highlight-box">
                <RiHeartPulseLine className="icon-participation " />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <Link to={item.url} className="colorlink">
                  Learn more
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
