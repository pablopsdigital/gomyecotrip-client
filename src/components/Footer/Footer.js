import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.scss';
import Brand from '../../resources/svg/gomyecotrip-symbol.svg';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="grid">
          <div className="col-left">
            <div>
              <Link to="/" className="logo">
                <img src={Brand} alt="brand-gomyecotrip" />
                Gomyecotrip
              </Link>
              <div>
                Gomyecotrip.com was born in 2021 as the first platform specialized in offering
                ecotourism experiences. It is the perfect place to find your next adventure, near or
                far, alone, with friends or family, as you want to enjoy it. Here you will find the
                best options at your fingertips, try, repeat and tell us about it.
              </div>
            </div>
          </div>
          <div className="col-right">
            <div>
              <h2>Services</h2>
              <ul>
                <li>
                  <Link to="/experiences">Ecoexperiences</Link>
                </li>
                <li>
                  <Link to="/support">The project</Link>
                </li>
                <li>
                  <Link to="/support">Carrers</Link>
                </li>
                <li>
                  <Link to="/support">News</Link>
                </li>
                <li>
                  <Link to="/support">Corporate</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2>Help</h2>
              <ul>
                <li>
                  <Link to="/host/welcome">Host an ecoexperience</Link>
                </li>
                <li>
                  <Link to="/support">How it works</Link>
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>
                <li>
                  <Link to="/support">Help Center</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2>Legal</h2>
              <ul>
                <li>
                  <Link to="/support">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/support">Privary policy</Link>
                </li>
                <li>
                  <Link to="/support">Cookies policy</Link>
                </li>
                <li>
                  <Link to="/host/welcome">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="rights">
            @ {currentYear}-{currentYear + 1} | gomyecotrip.com | All Rights Reserved.
          </div>
          <div className="social">
            <ul>
              <li>
                <a href="https://es-es.facebook.com/" rel="noreferrer" target="_blank">
                  <FacebookIcon fontSize="large" />
                </a>
              </li>
              <li>
                <a href="https://es-es.facebook.com/" rel="noreferrer" target="_blank">
                  <TwitterIcon fontSize="large" />
                </a>
              </li>
              <li>
                <a href="https://es-es.facebook.com/" rel="noreferrer" target="_blank">
                  <LinkedInIcon fontSize="large" />
                </a>
              </li>
              <li>
                <a href="https://es-es.facebook.com/" rel="noreferrer" target="_blank">
                  <InstagramIcon fontSize="large" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
