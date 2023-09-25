import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../../../components/Button';
import './Banner.scss';

export default function Banner() {
  const navigate = useNavigate();
  return (
    <section id="banner-planning">
      <div className="content">
        <div className="text">
          <h2>Organize and plan your next ecogetaway</h2>
          <p>
            Discover the more than 200 experiences we have for you, places and natural activities
            unknown to most tourists, enter the green lung and enjoy the better explanations with
            specialized guides.
          </p>
        </div>
        <Button outline onClick={() => navigate('/experiences')}>
          Explore all ecoexperiences
        </Button>
      </div>
      <div className="lottie-container">
        <lottie-player
          //   src="https://assets5.lottiefiles.com/packages/lf20_veqkjqvf.json"
          src="https://assets10.lottiefiles.com/packages/lf20_RKwt3u.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>
    </section>
  );
}
