import React, {useState, useEffect} from 'react';
import './Description.css';

export default function Description({experience, ...props}) {
  const {description} = experience;
  return (
    <section className="experience-page-content">
      <h3 className="title-section">About this trip</h3>
      <div>{description}</div>
    </section>
  );
}
