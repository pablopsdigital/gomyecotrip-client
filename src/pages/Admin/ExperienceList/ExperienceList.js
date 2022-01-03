import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './ExperienceList.scss';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {Button} from '../../../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  deleteExperience,
  getAllExperiencesForHostAndAdmin
} from '../../../actions/experiencesActions';
import LayoutAdmin from '../Dashboard/LayoutAdmin';
import AddIcon from '@mui/icons-material/Add';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';
import EditIcon from '@mui/icons-material/Edit';
import useAuthUserContext from '../../../hooks/useAuthUser';

export default function ExperienceList(props) {
  //UserInfo
  const {signin, userInfo} = useAuthUserContext();

  //Route
  const navigate = useNavigate();

  //If url search param hosted
  const {pathname} = useLocation();
  const hostedMode = pathname.indexOf('/hosted') >= 0;

  //Data
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const resetError = () => setError(null);
  const resetSuccess = () => setSuccess(null);

  //Create
  const [experienceCreate, setExperienceCreate] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);

  const createHandler = (event) => {
    event.preventDefault;
    alert('create');
  };

  //Delete
  const [experienceForDelete, setExperienceForDelete] = useState('');
  const [update, setUpdate] = useState(0);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);

  const [modal, setModal] = useState(false);

  const handlerDeleteExperience = async () => {
    resetError();
    try {
      setLoading(true);
      const data = await deleteExperience(experienceForDelete);
      setModal(false);
      setSuccess('Experience Delete');
      setUpdate(update + 1);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const controlDataModal = (experienceID) => {
    setExperienceForDelete(experienceID);
    setModal(true);
  };

  useEffect(() => {
    setExperienceCreate(false);
    const fetchData = async () => {
      try {
        setLoading(true);
        //Filter query url params hosted
        const data = await getAllExperiencesForHostAndAdmin({
          hosted: hostedMode ? userInfo._id : ''
        });
        setExperiences(data.experiences);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [experienceCreate, update]);

  return (
    <LayoutAdmin>
      <div id="experience" className="container profile-container">
        <div className="header-admin-page">
          <h2 className="title">Experiences list</h2>
          <Button onClick={() => navigate('/experience/create')}>
            <AddIcon />
            Create New
          </Button>
        </div>
        <div className="profile-content">
          {!loading ? (
            <>
              <div className="container-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Code and name</th>
                      {/* <th>Current bookings</th> */}
                      <th>Rates</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experiences.map((experience) => (
                      <tr key={experience._id}>
                        <td className="col-1">
                          <div>
                            <img className="image" src={experience.featuredImage} />
                          </div>
                        </td>
                        <td>
                          <p>
                            <Link to={`/experience/${experience._id}`} target="_blank">
                              {experience.name}
                            </Link>
                          </p>
                          <p>{experience._id}</p>
                        </td>
                        {/* <td>
                        {experience.currentBookings.lenght > 0
                          ? // ? experience.currentBookings.lenght
                            Math.random() * (0 - 5) + 0
                          : 'Without bookings'}
                      </td> */}
                        <td>
                          <p>Adults: {experience.ratesForPerson.adults} €</p>
                          <p>Kids: {experience.ratesForPerson.kids} €</p>
                          <p>Babies: {experience.ratesForPerson.babies}€ </p>
                        </td>
                        <td>
                          <div className="types-experiences">
                            {experience.type.map((tipe, index) => (
                              <p key={index}>{tipe}</p>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="actions">
                            <button
                              type="button"
                              className="delete"
                              onClick={() => controlDataModal(experience._id)}
                            >
                              <DeleteIcon />
                            </button>
                            <button
                              type="button"
                              className="edit"
                              onClick={() => {
                                navigate(`/experience/${experience._id}/edit`);
                              }}
                            >
                              <EditIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="footer">
                  <div> {experiences ? `Showing: ${experiences.length} experiences` : ''}</div>
                </div>
              </div>

              {/* ====================================================================================
        Picker Dates
        ==================================================================================== */}
              {modal && (
                <div id="modal-delete">
                  <div className="overlay"></div>
                  <div className="modal">
                    <div className="modal-dates-panel-inner">
                      <h4 className="dual-picker-panel-title">Delete User</h4>
                      <div className="body">
                        <ErrorOutlineIcon className="icon" />
                      </div>
                      <div className="footer">
                        <Button contained onClick={handlerDeleteExperience}>
                          Detele
                        </Button>
                        <Button outline onClick={() => setModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            !loading && <NoResultsFound />
          )}
        </div>
        {/*Loading and errors */}
        {loading && <LoadingBox />}
        {error && (
          <MessageBox reset={resetError} severity="error">
            {error}
          </MessageBox>
        )}
        {success && (
          <MessageBox reset={resetSuccess} severity="success">
            {success}
          </MessageBox>
        )}
      </div>
    </LayoutAdmin>
  );
}
