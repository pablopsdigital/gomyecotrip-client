import React, {useState, useEffect} from 'react';
import Glide, {Controls, Autoplay, Swipe, Keyboard} from '@glidejs/glide/dist/glide.modular.esm';
import './SliderSection3.css';
import './Glide.css';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';
import ReviewStartAndCount from '../../../components/ReviewStartAndCount/ReviewStartAndCount';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import CategorieCard from '../../../components/CategorieCard/CategorieCard';

const categories = [
  {
    _id: '1',
    name: 'Adventure',
    url: 'adventure',
    short: 'Parck up and take of for increibles adventures',
    image:
      'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    _id: '2',
    name: 'Relax',
    url: 'relax',
    short: 'Parck up and take of for increibles adventures',
    image:
      'https://images.pexels.com/photos/426893/pexels-photo-426893.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    _id: '3',
    name: 'Family',
    url: 'family',
    short: 'Parck up and take of for increibles adventures',
    image:
      'https://images.pexels.com/photos/4452198/pexels-photo-4452198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    _id: '4',
    name: 'Culture',
    url: 'Culture',
    short: 'Parck up and take of for increibles adventures',
    image:
      'https://images.pexels.com/photos/784707/pexels-photo-784707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  }
];

export default function SliderSection3() {
  const [categoriesList, setCategoriesList] = useState([]);
  //================================================================
  //Glide
  //================================================================
  var content = document.querySelector('.glide3');
  const loadGlide3 = () => {
    if (content) {
      var glide = new Glide(content, {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        autoplay: 6000,
        breakpoints: {
          767: {
            perView: 1
          },
          900: {
            perView: 3
          },
          1024: {
            perView: 4
          }
        }
      });
      glide.mount({Controls, Autoplay, Swipe, Keyboard});
    }
  };

  useEffect(() => {
    setCategoriesList(categories);
    loadGlide3();
  });

  return (
    <section>
      <div className="container">
        <div>
          <div className="more-listings">
            {/* <!--Title--> */}
            <h4 className="title is-5 is-narrow">Best deals</h4>

            {/* <!--Scheduled experiences carousel--> */}
            <div className="listings" data-x-data="initMoreListings()">
              <div className="listings-inner glide3 more-experiences-glide">
                <div className="glide__track" data-glide-el="track">
                  {/* <!--Carousel--> */}
                  <ul className="glide__slides">
                    {categoriesList.map((categorie) => (
                      <li key={categorie._id} className="glide__slide">
                        <CategorieCard categorie={categorie} />
                      </li>
                    ))}

                    {/* Slides */}
                  </ul>
                </div>
                <div className="glide__arrows" data-glide-el="controls">
                  <button className="glide__arrow glide__arrow--left" data-glide-dir=">">
                    <FiArrowRight />
                  </button>
                  <button className="glide__arrow glide__arrow--right" data-glide-dir="<">
                    <FiArrowLeft />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
