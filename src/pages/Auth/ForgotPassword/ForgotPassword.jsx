import React, {useEffect, useState} from 'react';
import './ForgotPassword.scss';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {Button} from '../../../components/Button';
import {useNavigate} from 'react-router-dom';
import useAuthUserContext from '../../../hooks/useAuthUser';
import {MdAlternateEmail} from 'react-icons/md';
import Brand from '../../../resources/svg/gomyecotrip-symbol.svg';

export default function ForgotPassword(props) {
  //Router
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  //Data
  const {signin, userInfo} = useAuthUserContext();

  const [email, setEmail] = useState('');
  //User info
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO: Send email reset password
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="signin-container">
      <div className="signin-head">
        {/* Header ========================================================== */}
        <div>
          <Link to="/" className="brand-container ">
            <img className="brand-symbol-img signin-brand" src={Brand} alt="" />
          </Link>
        </div>
        <p>
          <small>{`Enter the email address associated with your account and we'll send you a link to reset your password.`}</small>
        </p>
      </div>

      {/* Loading and Error ========================================================== */}
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}

      {/* Form container ========================================================== */}
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          <div className="field">
            <div className="field-icon">
              <span className="form-icon">
                <MdAlternateEmail />
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
            <label />
            <Button contained full type="submit">
              Continue
            </Button>
          </div>
          <div>
            <label />
          </div>
        </form>
      </div>

      {/* footer ========================================================== */}
      <div>
        <p>
          {`Don't have an account? `}
          <Link to={`/signup?redirect=/`}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
