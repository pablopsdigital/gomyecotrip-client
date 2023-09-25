import React, { useEffect } from 'react';
import './HostEditProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getListExperiences } from '../../../redux/actions/experienceActions';
import { detailsUser } from '../../../redux/actions/userActions';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import ExperienceCard from '../../../components/SliderSection5/SliderSection5';
import ReviewStartAndCount from '../../../components/ReviewStartAndCount/ReviewStartAndCount';

export default function HostEditProfile(props) {
  const hostedId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const experienceList = useSelector((state) => state.experienceList);
  const {
    loading: loadingExperiences,
    error: errorExperiences,
    experiences,
  } = experienceList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(hostedId));
    dispatch(getListExperiences({ hosted: hostedId }));
  }, [dispatch, hostedId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.hosted.logo}
                    alt={user.hosted.name}
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{user.hosted.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <ReviewStartAndCount
                rating={user.hosted.rating}
                numReviews={user.hosted.numReviews}
              ></ReviewStartAndCount>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact hosted</a>
            </li>
            <li>{user.hosted.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingExperiences ? (
          <LoadingBox></LoadingBox>
        ) : errorExperiences ? (
          <MessageBox variant="danger">{errorExperiences}</MessageBox>
        ) : (
          <>
            {experiences.length === 0 && (
              <MessageBox>No Experience Found</MessageBox>
            )}
            <div className="row center">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience._id}
                  experience={experience}
                ></ExperienceCard>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
