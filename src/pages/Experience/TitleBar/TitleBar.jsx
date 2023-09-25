import React from 'react';
import {RiHeartPulseLine} from 'react-icons/ri';
import ReviewStartAndCount from '../../../components/ReviewStartAndCount/ReviewStartAndCount';
import './TitleBar.css';
import {Link} from 'react-router-dom';

export default function TitleBar({experience, ...props}) {
  const {name} = experience;
  return (
    <>
      <div className="experience-page-title-bar">
        <div className="left">
          <h2 className="title">{name}</h2>
          <ReviewStartAndCount
            reviewCount={experience.reviewCount}
            reviewStart={experience.reviewStart}
            place={experience.address}
          />
        </div>
        {/* <div className="right">
          <a className="modal-trigger" data-modal="listing-share-modal">
            <RiHeartPulseLine className="icon-feature" />
            <span>Share</span>
          </a>
          <a>
            <RiHeartPulseLine className="icon-feature" />
            <span>Save</span>
          </a>
        </div> */}
      </div>
    </>
  );
}
