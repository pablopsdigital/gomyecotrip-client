import React, {useState} from 'react';
import './ExperienceCard.scss';
import {Link} from 'react-router-dom';
import ReviewStartAndCount from '../ReviewStartAndCount/ReviewStartAndCount';
import {Avatar, IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import useAuthUserContext from '../../hooks/useAuthUser';

export default function ExperienceCard({experience, ...props}) {
  const {favorites, addFavorites} = useAuthUserContext();

  const handlerFavorite = () => {
    addFavorites(experience);
  };

  return (
    <li id="experience-vertical-card">
      <div className="experience-card">
        <div className="header-vertical-card">
          <div className="icon-container">
            <IconButton className="icon" aria-label="add to favorites" onClick={handlerFavorite}>
              {!favorites.includes(experience._id) ? <FavoriteBorderIcon /> : <FavoriteIcon />}
            </IconButton>
          </div>
        </div>
        <div className="card-body">
          <Link target="_blank" to={`/experience/${experience._id}`}>
            <img className="cover-image" src={experience.featuredImage} alt={experience.name} />
            <div className="content">
              <div className="content-header">
                <Avatar
                  alt={experience.hosted ? experience.hosted.hosted.name : ''}
                  src={
                    experience.hosted ? experience.hosted.hosted.logo : 'https://i.pravatar.cc/500'
                  }
                  sx={{width: 30, height: 30}}
                />
                <p> Host: {experience.hosted ? experience.hosted.hosted.name : ''} </p>
              </div>

              <div className="content-body">
                <div className="title">
                  <h2>{experience.name}</h2>
                </div>
                <div className="location">
                  <FmdGoodIcon />
                  <p>{experience.address.address}</p>
                </div>

                <div className="types">
                  {experience.type.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>

              <div className="content-footer">
                <div className="price">
                  {experience.ratesForPerson.adults} € <span>/adult</span>
                </div>
                <div>
                  <ReviewStartAndCount
                    reviewCount={experience.reviewCount}
                    reviewStart={experience.reviewStart}
                    place={experience.address.address}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
}
