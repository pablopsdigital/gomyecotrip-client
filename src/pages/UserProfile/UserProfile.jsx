import React, {useEffect, useState} from 'react';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import {Button} from '../../components/Button';
import {USER_UPDATE_PROFILE_RESET} from '../../redux/constants/userConstants';
import Layout from '../../components/Layout/Layout';
import LayoutUserProfile from './LayoutUserProfile';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import './UserProfile.scss';
import useAuthUserContext from '../../hooks/useAuthUser';
import {getOneUserForId, updateUserProfileFromUser} from '../../actions/userActions';
import {uploadFileProfile} from '../../actions/uploadFilesActions';
import NoResultsFound from '../../components/NoResultsFound/NoResultsFound';
import {Tooltip} from '@mui/material';

export default function UserProfile() {
  //User info
  const {signin, isAuth, userInfo} = useAuthUserContext();
  const [update, setUpdate] = useState(0);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Update Profile
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageAvatar, setImageAvatar] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getOneUserForId(userInfo._id);

      setUser(data);

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPassword(data.password);
      setImageAvatar(data.imageAvatar);

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
    fetchData();
  }, [update]);

  const uploadImageProfile = async (event) => {
    event.preventDefault();
    setError(null);
    const file = event.target.files[0];
    console.log('File', file);
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    try {
      setLoading(true);
      const response = await uploadFileProfile(bodyFormData);
      setImageAvatar(response.url);
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

    if (password !== confirmPassword) {
      setError('Password and Confirm Password Are Not Matched');
    } else {
      try {
        setLoading(true);
        const userInfo = await updateUserProfileFromUser({
          _id: user._id,
          firstName,
          lastName,
          email: user.email,
          password,
          imageAvatar
        });
        signin({userInfo: userInfo});
        setLoading(false);
        setUpdate(update + 1);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <LayoutUserProfile>
      <div className="content-page">
        <div className="container">
          <div className="header">
            <h1>User Profile</h1>
          </div>

          <form className="form" onSubmit={submitHandler}>
            {!loading && userInfo ? (
              <div className="grid-form">
                <div>
                  <img className="avatar" src={user.imageAvatar} />
                  <div className="input-image">
                    <input
                      id="imageAvatar"
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
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <Tooltip title="Your email cannot be updated">
                      <input
                        disabled
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Enter confirm password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label />
                    <Button className="primary" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              !loading && <NoResultsFound />
            )}
            {loading && <LoadingBox />}
            {error && (
              <MessageBox reset={resetError} severity="error">
                {error}
              </MessageBox>
            )}
          </form>
        </div>
      </div>
    </LayoutUserProfile>
  );
}
