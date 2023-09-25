import React from 'react';
import './ReviewStartAndCount.scss';
import StarIcon from '@mui/icons-material/Star';

export default function ReviewStartAndCount({ reviewCount, reviewStart, place, ...props }) {
  return (
    <div className="review-start-and-count">
      <StarIcon className="start-icon" />
      <div className="review-values">
        <p>{reviewStart}</p>
        <p className="count">({reviewCount})</p>
      </div>
    </div>
  );
}
