import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './SignIn.scss';
// import { signin } from '../../../redux/actions/userActions';
import {signInUser} from '../../../actions/userActions';
import {Button} from '../../../components/Button';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch.jsx';
import Brand from '../../../resources/svg/gomyecotrip-symbol.svg';

import {AiOutlineUser} from 'react-icons/ai';
import {MdAlternateEmail} from 'react-icons/md';
import useAuthUserContext from '../../../hooks/useAuthUser';

export default function SignIn(props) {
  //Router
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //User info
  const {signin, userInfo} = useAuthUserContext();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const resetError = () => setError(null);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //=============================================================================
  //Control inputs form
  //=============================================================================
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const onRemembermeChange = (checked) => {
    setRememberme(checked);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    resetError();
    try {
      const response = await signInUser(email, password);
      console.log('response', response);
      signin(response);
      setLoading(false);
      navigate(redirect);
    } catch (error) {
      console.log('error', error);
      setError(error.error);
      setLoading(false);
    }
  };

  //=============================================================================
  //Return
  //=============================================================================
  return (
    <div className="signin-container">
      <div className="signin-head">
        {/* Header ========================================================== */}
        <div>
          <Link to="/" className="brand-container ">
            <img className="brand-symbol-img signin-brand" src={Brand} alt="" />
          </Link>
        </div>
        <h1>Sign In</h1>
        <p>
          Welcome Back. <br />
          Please sign in to your account
        </p>
        <div className="signin-new">
          <Link to={`/signup?redirect=${redirect}`}>I do not have an account yet</Link>
        </div>
      </div>

      {/* Loading and Error ========================================================== */}
      {loading && <LoadingBox />}
      {error && (
        <MessageBox reset={resetError} severity="error">
          {error}
        </MessageBox>
      )}

      {/* Form container ========================================================== */}
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          <div className="field">
            <div className="field-icon">
              <span className="form-icon">
                <AiOutlineUser />
              </span>
              <input
                className="input"
                type="email"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <div className="field">
              <div className="field-icon">
                <span className="form-icon">
                  <MdAlternateEmail />
                </span>
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className="toggle-switch-container">
            <ToggleSwitch
              id="rememberme"
              small={true}
              checked={rememberme}
              onChange={onRemembermeChange}
            />
            <label htmlFor="rememberme">Remember me</label>
          </div>

          <div>
            <label />
            <Button contained full type="submit">
              Sign In
            </Button>
          </div>
          <div>
            <label />
          </div>
        </form>
      </div>

      {/* footer ========================================================== */}
      <div>
        <Link to={`/forgot-password`}>Forgot passwod? </Link>
      </div>
    </div>
  );
}
