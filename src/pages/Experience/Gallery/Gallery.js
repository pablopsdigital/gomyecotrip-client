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
          <img src={featuredImage} caption="All you need is a laptop to get started!" />
        </div>
        <div>
          <img src={galleryImgs[0]} caption="All you need is a laptop to get started!" />
        </div>
        {/* <div>
          <img src={galleryImgs[1]} caption="All you need is a laptop to get started!" />
        </div> */}
        <button className="button-all-photos-gallery">Show All</button>
      </div>
    </>
  );
}
