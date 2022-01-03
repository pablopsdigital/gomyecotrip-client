import React, { useEffect, useState } from 'react';
// import './HostProfile.css';
import Layout from '../../../components/Layout/Layout';
import { Button } from '../../../components/Button';

import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../../redux/actions/userActions';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../../../redux/constants/userConstants';
import { userUpdateProfileReducer } from '../../../redux/reducers/userReducers';

export default function HostProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hostedName, setHostedName] = useState('');
  const [hostedLogo, setHostedLogo] = useState('');
  const [hostedDescription, setHostedDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.hosted) {
        setHostedName(user.hosted.name);
        setHostedLogo(user.hosted.logo);
        setHostedDescription(user.hosted.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          hostedName,
          hostedLogo,
          hostedDescription,
        })
      );
    }
  };

  return (
    <Layout>
      <div className="container profile-container">
        <div className="profile-head">
          <h1 className="profile-title">Your Profile</h1>
        </div>
        <div className="profile-content">
          <form className="form" onSubmit={submitHandler}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                <div className="profile-inputs-container">
                  <div className="input-section">
                    <div className="label-container">
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-container">
                      <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                  </div>

                  <div className="input-section">
                    <div className="label-container">
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-container">
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div className="input-section">
                    <div className="label-container">
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-container">
                      <input id="password" type="password" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)}></input>
                    </div>
                  </div>

                  <div className="input-section">
                    <div className="label-container">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                    <div className="input-container">
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Enter confirm password"
                        onChange={(event) => setConfirmPassword(event.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>

                {user.isHosted && (
                  <>
                    <hr />
                    <div className="profile-hosted-head">
                      <h1 className="profile-title">Hosted</h1>
                    </div>

                    <div className="profile-inputs-container">
                      <div className="input-section">
                        <div className="label-container">
                          <label htmlFor="hostedName">Hosted Name</label>
                        </div>
                        <div className="input-container">
                          <input
                            id="hostedLogo"
                            type="text"
                            placeholder="Enter Hosted Logo"
                            value={hostedLogo}
                            onChange={(e) => setHostedLogo(e.target.value)}
                          ></input>
                        </div>
                      </div>

                      <div className="input-section">
                        <div className="label-container">
                          <label htmlFor="hostedLogo">Hosted Logo</label>
                        </div>
                        <div className="input-container">
                          <input
                            id="hostedLogo"
                            type="text"
                            placeholder="Enter Hosted Logo"
                            value={hostedLogo}
                            onChange={(e) => setHostedLogo(e.target.value)}
                          ></input>
                        </div>
                      </div>

                      <div className="input-section">
                        <div className="label-container">
                          <label htmlFor="hostedDescription">Hosted Description</label>
                        </div>
                        <div className="input-container">
                          <input
                            id="hostedDescription"
                            type="text"
                            placeholder="Enter Hosted Description"
                            value={hostedDescription}
                            onChange={(e) => setHostedDescription(e.target.value)}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="profile-footer">
                  <label />
                  <Button contained type="submit">
                    Update Profile
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}
