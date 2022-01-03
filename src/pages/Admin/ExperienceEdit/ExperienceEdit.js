import './ExperienceEdit.scss';
import React, {useEffect, useState} from 'react';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {Button} from '../../../components/Button';
import {useNavigate, useParams} from 'react-router-dom';
import LayoutAdmin from '../Dashboard/LayoutAdmin';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';
import Types from './CheckBox/CheckBoxTypes';
import Amenities from './CheckBox/CheckBoxAmenities';
import DropFileUpload from './DropFileUpload/DropFileUpload';
import MapLocation from './MapLocation/MapLocation';
import DropFilesUpload from './DropFileUpload/DropFilesUpload';
import {updateExperience, getDetailsExperienceById} from '../../../actions/experiencesActions';
import useAuthUserContext from '../../../hooks/useAuthUser';

export default function ExperienceEdit(props) {
  //Router and params
  const navigate = useNavigate();
  const params = useParams();
  const {id: experienceId} = params;

  //Data
  const {userInfo} = useAuthUserContext();

  const [experienceData, setExperienceData] = useState({
    name: 0,
    description: 0,
    duration: 0,
    maxCount: 0,
    featuredImage: '',
    galleryImgs: [],
    address: {},
    type: [],
    hosted: {},
    adultRate: 0,
    kidRate: 0,
    babieRate: 0,
    amenities: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const resetError = () => setError(null);

  // Control inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [maxCount, setMaxCount] = useState(0);
  const [featuredImage, setFeaturedImage] = useState('');
  const updateFeaturedImage = (listUrls) => {
    setFeaturedImage(listUrls);
  };
  const [galleryImgs, setGalleryImgs] = useState([]);
  const updateGallery = (listUrls) => {
    setGalleryImgs(listUrls);
  };
  const [address, setAddress] = useState({});
  const updateAddress = (address) => {
    setAddress(address);
  };
  const [type, setType] = useState('');
  const updateTypes = (listTypes) => {
    setType(listTypes);
  };

  const [adultRate, setAdultRate] = useState(0);
  const [kidRate, setKidRate] = useState(0);
  const [babieRate, setBabieRate] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const updateAmenities = (listAmenities) => {
    setAmenities(listAmenities);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getDetailsExperienceById(experienceId);
      setExperienceData(data);

      setName(data.name);
      setDescription(data.description);
      setDuration(data.duration);
      setMaxCount(data.maxCount);
      setFeaturedImage(data.featuredImage);
      setGalleryImgs(data.galleryImgs);
      setAddress(data.address);
      setType(data.type);
      setAdultRate(data.ratesForPerson.adults);
      setKidRate(data.ratesForPerson.kids);
      setBabieRate(data.ratesForPerson.babies);
      setAmenities(data.amenities);

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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const experience = await updateExperience({
        name,
        description,
        duration,
        maxCount,
        featuredImage,
        galleryImgs,
        address: address ? address : experienceData.address,
        type: type ? type : experienceData.type,
        hosted: userInfo._id,
        adultRate,
        kidRate,
        babieRate,
        amenities
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }

    // navigate('/experiencelist');
  };

  return (
    <LayoutAdmin>
      <div id="experience-edit">
        <div className="content-page">
          <div className="container">
            <div className="header">
              <h1>Edit Experience</h1>
            </div>

            <form className="form" onSubmit={submitHandler}>
              {!loading ? (
                <>
                  <div className="body">
                    {/* Name */}
                    <div>
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      ></input>
                    </div>

                    {/* Row ================================*/}
                    <div className="wrapper-input-group2">
                      <div>
                        <label htmlFor="duration">Duration (in hours)</label>
                        <input
                          min="0"
                          step="any"
                          id="duration"
                          type="number"
                          placeholder="Enter duration"
                          value={duration}
                          onChange={(event) => setDuration(event.target.value)}
                        ></input>
                      </div>

                      <div>
                        <label htmlFor="maxCount">Bookings for day</label>
                        <input
                          min="0"
                          step="any"
                          id="maxCount"
                          type="number"
                          placeholder="Enter max bookings for day"
                          value={maxCount}
                          onChange={(event) => setMaxCount(event.target.value)}
                        ></input>
                      </div>
                    </div>

                    {/* Row ================================*/}
                    <div>
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        rows="3"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      ></textarea>
                    </div>

                    {/* Row ================================*/}
                    <div className="wrapper-input-group3">
                      <div>
                        <label htmlFor="adultRate">Adult Rate</label>
                        <input
                          min="0"
                          step="any"
                          id="adultRate"
                          type="number"
                          placeholder="Enter adult rate"
                          value={adultRate}
                          onChange={(event) => setAdultRate(event.target.value)}
                        ></input>
                      </div>

                      <div>
                        <label htmlFor="kidRate">Kid Rate</label>
                        <input
                          min="0"
                          step="any"
                          id="kidRate"
                          type="number"
                          placeholder="Enter kid rate"
                          value={kidRate}
                          onChange={(event) => setKidRate(event.target.value)}
                        ></input>
                      </div>

                      <div>
                        <label htmlFor="babieRate">Babie Rate</label>
                        <input
                          min="0"
                          step="any"
                          id="babieRate"
                          type="number"
                          placeholder="Enter babie rate"
                          value={babieRate}
                          onChange={(event) => setBabieRate(event.target.value)}
                        ></input>
                      </div>
                    </div>

                    <div>
                      <label>Select type experience</label>
                      {experienceData.type.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                      <Types types={type} updateTypes={updateTypes} />
                    </div>

                    <div>
                      <label>Select amenities</label>
                      {experienceData.amenities.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                      <Amenities updateAmenities={updateAmenities} />
                    </div>

                    <div>
                      <label>Headder image</label>
                      <DropFileUpload updateFeaturedImage={updateFeaturedImage} />
                      <p>{featuredImage}</p>
                    </div>

                    <div>
                      <label>Gallery</label>
                      <DropFilesUpload updateGallery={updateGallery} />
                      {experienceData.galleryImgs.map((item, index) => {
                        <img key={index} src={item} />;
                      })}
                    </div>

                    <div>
                      <label>Direcction</label>
                      <p>Datos actuales: {experienceData.address.address}</p>
                      <MapLocation updateAddress={updateAddress} />
                    </div>
                  </div>

                  <div className="footer">
                    <Button outline onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button contained type="submit">
                      Update
                    </Button>
                  </div>
                </>
              ) : (
                !loading && <NoResultsFound />
              )}
            </form>
            {/*Loading and errors */}
            {loading && <LoadingBox />}
            {error && (
              <MessageBox reset={resetError} severity="error">
                {error}
              </MessageBox>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
