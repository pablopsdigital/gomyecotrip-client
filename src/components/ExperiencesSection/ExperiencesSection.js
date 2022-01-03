import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { getListExperiences } from '../../redux/actions/experienceActions';
import ExperienceCard from '../ExperienceCard/ExperienceCard';
import './ExperiencesSection.css';

export default function ExperiencesSection({
  sectionTitle,
  sectionSubtitle,
  experiences,
  ...props
}) {
  return (
    <div className="container experiences-container">
      <section className="experiences-section">
        <p className="font-medium tracking-wide text-blue-500 uppercase">
          {sectionSubtitle}
        </p>
        <h2 className="relative max-w-4xl mt-5 mb-10 text-4xl font-semibold leading-tight lg:text-5xl">
          {sectionTitle}
        </h2>
        <ul className="experiences-grid">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
            ></ExperienceCard>
          ))}
        </ul>
      </section>
    </div>
  );
}
