import React, {useState, useEffect} from 'react';
import Glide, {Controls, Autoplay, Swipe, Keyboard} from '@glidejs/glide/dist/glide.modular.esm';
import './SliderSection5.css';
import './Glide.css';
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi';
import ReviewStartAndCount from '../../../components/ReviewStartAndCount/ReviewStartAndCount';
import {Link} from 'react-router-dom';
import {IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

export default function SliderSection5({experiences, ...props}) {
  const [experiencesList, setExperiencesList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  //================================================================
  //Glide
  //================================================================
  var slider = document.querySelector('.glide');
  const loadGlide = () => {
    if (slider) {
      var glide = new Glide(slider, {
        type: 'carousel',
        startAt: 0,
        perView: 5,
        autoplay: 3000,
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
    if (experiences) {
      setExperiencesList(experiences);
    }
    loadGlide();
  });

  return (
    <section>
      <div className="container">
        <div>
          <div className="more-listings">
            {/* Title */}
            <h4 className="title">Popular experiences</h4>

            <div className="listings">
              <div className="listings-inner glide more-experiences-glide">
                <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                    {/* Slides */}
                    {experiencesList.map((experience) => (
                      <li key={experience._id} className="glide__slide">
                        <div className="listing">
                          <div
                            className="listing-image"
                            style={{
                              backgroundImage: `url(${experience.featuredImage})`
                            }}
                          >
                            <div className="action-bar">
                              <div className="icon-container">
                                <IconButton className="icon" aria-label="add to favorites">
                                  {!isFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                                </IconButton>
                              </div>
                            </div>
                          </div>
                          <div className="listing-content">
                            <div className="listing-rating">
                              <ReviewStartAndCount
                                reviewCount={experience.reviewCount}
                                reviewStart={experience.reviewStart}
                                place={experience.address}
                              />
                            </div>
                            <p className="listing-name">
                              <Link
                                className="title"
                                target="_blank"
                                to={`/experience/${experience._id}`}
                              >
                                {experience.name}
                              </Link>
                            </p>
                            <p className="listing-price">
                              from
                              <span className="price-value">
                                {` ${experience.ratesForPerson.adults}`} €
                              </span>
                              <small>/person</small>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
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
