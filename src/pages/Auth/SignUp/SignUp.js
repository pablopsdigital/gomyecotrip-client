import React, {useState, useEffect} from 'react';
import './SignUp.scss';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {signup} from '../../../redux/actions/userActions';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {Button} from '../../../components/Button';
import Brand from '../../../resources/svg/gomyecotrip-symbol.svg';

import {AiOutlineUser} from 'react-icons/ai';
import {FiLock} from 'react-icons/fi';
import {MdAlternateEmail} from 'react-icons/md';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import useAuthUserContext from '../../../hooks/useAuthUser';
import {signUpUser} from '../../../actions/userActions';

export default function SignUp(props) {
  //Url navigate
  //TODO:Worning memory
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //User info
  const {signin, userInfo} = useAuthUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetError = () => setError(null);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //=============================================================================
  //Control inputs form
  //=============================================================================
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptanceConditions, setAcceptanceConditions] = useState(false);
  const onAcceptanceConditionsChange = (checked) => {
    setAcceptanceConditions(checked);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Password and confirm password are not match.');
    } else if (acceptanceConditions !== true) {
      setError('You must read and accept the conditions to be able to process your data.');
    } else {
      setLoading(true);
      resetError();

      try {
        const response = await signUpUser(firstName, lastName, email, password);
        console.log('response', response);
        signin({userInfo: response.userInfo});
        setLoading(false);
      } catch (error) {
        console.log(error.error);
        setError(error.error);
        setLoading(false);
      }
    }
  };

  //=============================================================================
  //Return
  //=============================================================================
  return (
    <div id="signup-page" className="signup-page">
      {/*Form section*/}
      <div className="column-left">
        <div className="container-wrapper">
          <div className="resgister-header">
            <img className="brand-image" src={Brand} alt="" />
            <h2>Join Us Now.</h2>
            <p>Start by creating your account</p>
            <Link to={`/signin?redirect=${redirect}`}>I already have an account</Link>
          </div>
          <div className="signup-form-container">
            {/*Signin Form*/}
            <form onSubmit={submitHandler}>
              <div className="signin-form">
                {/*Input*/}
                <div className="field">
                  <div className="field-icon-container">
                    <input
                      className="input"
                      id="firstName"
                      type="text"
                      placeholder="FirstName*"
                      required
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <span className="form-icon">
                      <AiOutlineUser />
                    </span>
                  </div>
                </div>
                {/*Input*/}
                <div className="field">
                  <div className="field-icon-container">
                    <input
                      className="input"
                      id="lastName"
                      type="text"
                      placeholder="LastName*"
                      required
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    <span className="form-icon">
                      <AiOutlineUser />
                    </span>
                  </div>
                </div>
                {/*Input*/}
                <div className="field">
                  <div className="field-icon-container">
                    <input
                      className="input"
                      type="email"
                      id="email"
                      placeholder="Email Address*"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <span className="form-icon">
                      <MdAlternateEmail />
                    </span>
                  </div>
                </div>
                {/*Input*/}
                <div className="field">
                  <div className="field-icon-container">
                    <input
                      className="input"
                      type="password"
                      id="password"
                      placeholder="Enter password*"
                      required
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="form-icon">
                      <FiLock />
                    </span>
                  </div>
                </div>
                {/*Input*/}
                <div className="field">
                  <div className="field-icon-container">
                    <input
                      className="input"
                      type="password"
                      id="confirmPassword"
                      placeholder="Enter confirm ppassword*"
                      required
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    <span className="form-icon">
                      <FiLock />
                    </span>
                  </div>
                </div>

                <div className="toggle-switch-container">
                  <ToggleSwitch
                    id="acceptance-conditions"
                    small={true}
                    checked={acceptanceConditions}
                    onChange={onAcceptanceConditionsChange}
                  />
                  <label htmlFor="acceptance-conditions">
                    Accept privacy <Link to="/support">conditions</Link>
                  </label>
                </div>

                {/*boton*/}
                <div className="footer-signup">
                  <Button contained type="submit">
                    Sign Up
                  </Button>
                </div>
              </div>

              {loading && <LoadingBox />}
              {error && (
                <MessageBox reset={resetError} severity="error">
                  {error}
                </MessageBox>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Column right */}
      <div className="column-right">
        <img
          src="https://images.pexels.com/photos/5728297/pexels-photo-5728297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
        />
      </div>
    </div>
  );
}
