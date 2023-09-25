import React from 'react';
import {Link} from 'react-router-dom';
import './CategorieCard.scss';
import styled from 'styled-components';
import {Button} from '../Button';

export default function CategorieCard({categorie, ...props}) {
  return (
    <div
      className="categorie-card"
      style={{
        backgroundImage: `url(${categorie.image})`
      }}
    >
      <div className="categorire-overlay"></div>
      <div className="categorire-content">
        <div>
          <h3>{categorie.name}</h3>
          <p>{categorie.short}</p>
        </div>
        <div>
          <Link className="button-link" to={`/experiences?place=${categorie.url}`}>
            View all
          </Link>
        </div>
      </div>
    </div>
  );
}

const LinkStyled = styled(Link)`
  background-color: white;
  color: var(--primary);
  height: 2.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;
