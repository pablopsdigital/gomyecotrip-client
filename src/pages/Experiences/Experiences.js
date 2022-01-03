import React, {useEffect, useState} from 'react';
import './Experiences.scss';
import LayoutFilters from '../../components/Layout/LayoutFilters';
import {Button} from '../../components/Button';
import ExperienceCard from '../../components/ExperienceCard';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import MapGoogle from './MapGoogle/MapGoogle';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import {getAllExperiences} from '../../actions/experiencesActions';
import FiltersContext from '../../contexts/FiltersContext';

export default function Experiences({match, ...props}) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllExperiences();
        setExperiences(data.experiences);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //Filters
  //======================================================================
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [typesFilter, setTypesFilter] = useState([]);

  return (
    <FiltersContext.Provider value={{priceFilter, setPriceFilter, typesFilter, setTypesFilter}}>
      <LayoutFilters>
        {!loading ? (
          <div id="experiences" className="dual-container">
            <div className="col-left">
              <div className="header">
                <h3>Discover ecoexperiences near you</h3>
                <p>More than {experiences.length} ecoexperiences</p>
              </div>

              <div className="body">
                <ul className="experiences-list grid">
                  {experiences
                    .filter((experience) => {
                      return experience.ratesForPerson.adults > parseInt(priceFilter[0], 10);
                    })
                    .filter((experience) => {
                      return experience.ratesForPerson.adults < parseInt(priceFilter[1], 10);
                    })
                    .filter((experience) => {
                      return typesFilter.length >= 1
                        ? typesFilter[0] === experience.type[0] //TODO: In actualy only one first filter
                        : experience;
                    })
                    .map((experience) => {
                      return <ExperienceCard key={experience._id} experience={experience} />;
                    })}
                </ul>
                <div className="button-load-container">
                  <Button contained>Load More Experiences</Button>
                </div>
              </div>
            </div>

            <div className="col-right">
              <MapGoogle experiences={experiences}></MapGoogle>
            </div>
          </div>
        ) : (
          !loading && <NoResultsFound />
        )}
        {/*Loading and errors */}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </LayoutFilters>
    </FiltersContext.Provider>
  );
}
