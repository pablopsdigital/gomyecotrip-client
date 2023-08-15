import React from 'react';
import './Gallery.scss';

export default function Gallery({experience, ...props}) {
  const {featuredImage, galleryImgs} = experience;
  console.log(galleryImgs);

  console.log(galleryImgs);
  return (
    <>
      <div id="experience-gallery" className="experience-gallery">
        <div>
          <img src={featuredImage} />
        </div>
        <div>
          <img src={galleryImgs[0]} />
        </div>
        <button className="button-all-photos-gallery">Show All</button>
      </div>
    </>
  );
}
