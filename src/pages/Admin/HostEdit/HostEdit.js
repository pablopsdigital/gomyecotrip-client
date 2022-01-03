import React, {useEffect, useState} from 'react';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {Button} from '../../../components/Button';
import {useLocation, useNavigate} from 'react-router-dom';
import './HostEdit.scss';
import useAuthUserContext from '../../../hooks/useAuthUser';
import {
  getOneUserForId,
  updateHostProfileFromUser,
  updateUserProfileFromUser
} from '../../../actions/userActions';
import {uploadFileProfile} from '../../../actions/uploadFilesActions';
import LayoutAdmin from '../Dashboard/LayoutAdmin';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';

export default function HostEdit() {
  //TODO:Worning memory
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //User info
  const {signin, isAuth, userInfo} = useAuthUserContext();
  const [update, setUpdate] = useState(0);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Update Profile
  const [hostName, setHostName] = useState('');
  const [hostLogo, setHostLogo] = useState('');
  const [hostDescription, setHostDescription] = useState('');
  const [hostSpeakLanguages, setHostSpeakLanguages] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getOneUserForId(userInfo._id);

      setUser(data);

      setHostName(data.hosted.name);
      setHostLogo(data.hosted.logo);
      setHostDescription(data.hosted.description);
      setHostSpeakLanguages(data.hosted.speakLanguages);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const resetError = () => {
    setError(null);
  };

  useEffect(() => {
    if (!userInfo.isHosted) {
      navigate('/');
    }
  }, [navigate, redirect, userInfo]);

  useEffect(() => {
    fetchData();
  }, [update]);

  const uploadImageProfile = async (event) => {
    event.preventDefault();
    setError(null);
    const file = event.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    try {
      setLoading(true);
      const response = await uploadFileProfile(bodyFormData);
      setHostLogo(response.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const userInfo = await updateHostProfileFromUser({
        _id: user._id,
        hostName,
        hostLogo,
        hostDescription,
        hostSpeakLanguages
      });
      console.log('userInfo', userInfo);
      setUser(userInfo);
      setLoading(false);
      setUpdate(update + 1);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <LayoutAdmin>
      <div id="host-profile" className="content-page">
        <div className="container">
          <div className="header">
            <h1>Host Profile</h1>
          </div>
          <form className="form" onSubmit={submitHandler}>
            {!loading && user.isHosted ? (
              <div className="grid-form">
                <div>
                  <img className="avatar" src={user.hosted.logo} />
                  <div className="input-image">
                    <input
                      id="logo"
                      type="file"
                      accept=".jpg,.png"
                      label="Choose Image"
                      onChange={uploadImageProfile}
                    ></input>
                    <p>Only *.jpg and *.png formats</p>
                  </div>
                </div>
                <div className="col-right">
                  <div>
                    <label htmlFor="hostName">Host Name</label>
                    <input
                      id="hostName"
                      type="text"
                      placeholder="Enter host name"
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="hostDescription">Host description</label>
                    <textarea
                      id="hostDescription"
                      type="text"
                      rows={5}
                      cols={5}
                      placeholder="Enter host description"
                      value={hostDescription}
                      onChange={(e) => setHostDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="hostSpeakLanguages">Host languages (English,French)</label>
                    <input
                      id="hostSpeakLanguages"
                      type="text"
                      placeholder="Enter host languages"
                      value={hostSpeakLanguages}
                      onChange={(e) => setHostSpeakLanguages(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label />
                    <Button className="primary" type="submit">
                      Update host profile
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              !loading && <NoResultsFound />
            )}
          </form>

          {loading && <LoadingBox></LoadingBox>}
          {error && (
            <MessageBox reset={resetError} severity="error">
              {error}
            </MessageBox>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
}
