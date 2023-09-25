import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import styled from 'styled-components';

export default function Hero() {
  return (
    <Section id="hero">
      <div className="overlay"></div>
      <div className="content">
        <h1>Find your next sustainable adventure</h1>
        <p>Explore and book the best ECO experiences</p>
        <Link to="/experiences">
          <Button contained>Explore</Button>
        </Link>
      </div>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  margin: 4rem 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://images.pexels.com/photos/238631/pexels-photo-238631.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  height: 600px;
  width: auto;
  color: #ffffff;
  border-radius: var(--radius-05);
  .overlay {
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(40, 50, 82, 0.6);
    border-radius: var(--radius-05);
  }
  .content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  p {
    margin-bottom: 2rem;
  }
`;
