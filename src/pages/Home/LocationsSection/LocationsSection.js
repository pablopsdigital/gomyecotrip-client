import React from 'react';
import {Link} from 'react-router-dom';
import './LocationsSection.scss';

const locations = [
  {
    _id: 1,
    name: 'Barcelona',
    url: 'barcelona',
    image:
      'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80',
    experiencesCueantity: 5
  },
  {
    _id: 2,
    name: 'Santiago de Compostela',
    url: 'santiago',
    image:
      'https://images.pexels.com/photos/6713876/pexels-photo-6713876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    experiencesCueantity: 25
  },
  {
    _id: 3,
    name: 'Málaga',
    url: 'malaga',
    image:
      'https://images.pexels.com/photos/1884417/pexels-photo-1884417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    experiencesCueantity: 8
  },
  {
    _id: 4,
    name: 'Cangas de Onís',
    url: 'cangas-onis',
    image:
      'https://images.pexels.com/photos/8677510/pexels-photo-8677510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',

    experiencesCueantity: 15
  },
  {
    _id: 5,
    name: 'Extremadura',
    url: 'extremadura',
    image:
      'https://images.unsplash.com/photo-1550667963-db518f2a22b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    experiencesCueantity: 23
  },
  {
    _id: 6,
    name: 'Valencia',
    url: 'valencia',
    image:
      'https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    experiencesCueantity: 16
  },
  {
    _id: 7,
    name: 'Bilbao',
    url: 'bilbao',
    image:
      'https://images.pexels.com/photos/8130638/pexels-photo-8130638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    experiencesCueantity: 9
  },
  {
    _id: 8,
    name: 'Aragon',
    url: 'aragon',
    image:
      'https://images.pexels.com/photos/259683/pexels-photo-259683.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    experiencesCueantity: 22
  }
];

export default function LocationsSection() {
  const CardLocation = ({location, ...props}) => {
    return (
      <div id="card-location">
        <Link to={location.url} className="link-container">
          <div>
            <img src={location.image} alt={location.name} />
          </div>
          <div>
            <h3>{location.name}</h3>
            <p>{location.experiencesCueantity} ecoexperiences</p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section id="location-section">
      <div className="header">
        <h2>Explore the sustainable world</h2>
        <p>Discover great ecoexperiences anywhere</p>
      </div>
      <div className="grid">
        {locations.map((location, index) => (
          <CardLocation key={index} location={location} />
        ))}
      </div>
    </section>
  );
}
