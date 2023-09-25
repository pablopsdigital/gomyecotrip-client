import React from 'react';
import './HostInfo.scss';
import ReviewStartAndCount from '../../../components/ReviewStartAndCount/ReviewStartAndCount';

export default function HostInfo({experience}) {
  const {firstName, imageAvatar, hosted} = experience;
  return (
    <div className="experience-page-detail-hosted">
      <div className="col-left">
        <h3 className="title">This experience is organized by {hosted ? hosted.firstName : ''}</h3>
        <div>
          <p>Name of establishment: {hosted ? hosted.hosted.name : firstName}</p>
          <div>
            <ReviewStartAndCount
              reviewCount={hosted ? hosted.hosted.reviewCount : 0}
              reviewStart={hosted ? hosted.hosted.reviewStart : 0}
            />
          </div>
        </div>
      </div>
      <div className="col-right">
        <div>
          <img src={hosted.hosted.logo} alt="" />
        </div>
      </div>
    </div>
  );
}
