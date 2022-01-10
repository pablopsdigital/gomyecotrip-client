import React, {useState, useEffect} from 'react';
import {getAllExperiences} from '../../../actions/experiencesActions';
import LayoutUserProfile from '../LayoutUserProfile';
import ExperienceCard from '../../../components/ExperienceCard';
import './UserSaveExperiences.scss';
import useAuthUserContext from '../../../hooks/useAuthUser';

export default function UserSaveExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {favorites, addFavorites} = useAuthUserContext();

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

  return (
    <LayoutUserProfile>
      <div className="content-page">
        <div className="container">
          <div className="header">
            <h1>Save Experiences</h1>
          </div>
          <ul className="experience-grid">
            {experiences
              .filter((experience) => {
                return favorites.includes(experience._id);
              })
              .map((experience) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
          </ul>
        </div>
      </div>
    </LayoutUserProfile>
  );
}
