import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout/Layout';
import SliderSection5 from './SliderSection5';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import Hero from './Hero';
import {useNavigate} from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';

import moment from 'moment';
import {getAllExperiences} from '../../actions/experiencesActions';
import SliderSection3 from './SliderSection3/SliderSection3';
import LocationsSection from './LocationsSection/LocationsSection';
import useAuthUserContext from '../../hooks/useAuthUser';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import Banner from './Banner/Banner';

export default function Home() {
  //==================================================================
  // Load experiences
  //==================================================================
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {isAuth, userInfo} = useAuthUserContext();

  const fetchData = async () => {
    try {
      setLoading(true);
      //Filter query url params hosted
      const data = await getAllExperiences();
      setExperiences(data.experiences);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //==================================================================
  //Render
  //==================================================================
  return (
    <Layout>
      <div className="container">
        <Hero />
        {!loading ? (
          <div>
            <SliderSection5 experiences={experiences} />
            <Banner />
            {/* <ExperiencesSection
              experiences={experiences}
              subtitle="Popular experiences recommended for you"
              title="Outstanding experiences to stay"
            /> */}
            <LocationsSection />
            <SliderSection3 experiences={experiences} />
          </div>
        ) : (
          !loading && <NoResultsFound />
        )}
        {/*Loading and errors */}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        enableDeclineButton
        declineButtonStyle={{
          border: '2px solid white',
          background: '#671cc9',
          color: 'white',
          fontSize: '1rem',
          borderRadius: '0.5rem'
        }}
        cookieName="myAwesomeCookieName2"
        style={{background: '#671cc9'}}
        buttonStyle={{
          background: 'white',
          color: '#671cc9',
          fontSize: '1rem',
          borderRadius: '0.5rem'
        }}
        expires={150}
      >
        {`The cookie warning is simulated, it does not activate or deactivate any cookies. Our website uses cookies to improve your experience. We'll assume you're ok with this, but
        you can opt-out if you wish.`}
      </CookieConsent>
    </Layout>
  );
}
