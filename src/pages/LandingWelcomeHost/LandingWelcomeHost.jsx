import React from 'react';
import Layout from '../../components/Layout/Layout';
import './LandingWelcomeHost.scss';
import BoltIcon from '@mui/icons-material/Bolt';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

export default function LandingWelcomeHost() {
  return (
    <Layout>
      <div id="landing-welcome-host" className="container">
        <div className="header">
          <h1>Become a host</h1>
        </div>
        <div className="grid">
          <div>
            <BoltIcon className="icon" />
            <h3>Fast support</h3>
            <p>We answer your questions asap on our support portal.</p>
          </div>
          <div>
            <CurrencyExchangeIcon className="icon" />
            <h3>Low commissions</h3>
            <p>We try to offer the most competitive rates in order to continue growing together </p>
          </div>
          <div>
            <HomeRepairServiceIcon className="icon" />
            <h3>Adapted tools</h3>
            <p>You will have access to a set of specialised tools for your business.</p>
          </div>
          <div>
            <OndemandVideoIcon className="icon" />
            <h3>Video Tutorials</h3>
            <p>We have recorded more than 20 video tutorials explaining each of the functions.</p>
          </div>
        </div>

        <div className="call">
          <h2>Try the platform for 15 days free of charge.</h2>
          <p>
            Call us on <span>647640150</span> and we will.
          </p>
          <h2> Or if you prefer, write to us at</h2>
          <p>
            <a className="link" href="mailto:info@gomyecotrip.com?Subject=Suscription gomyecotrip">
              {' '}
              contact by info@gomyecotrip.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
