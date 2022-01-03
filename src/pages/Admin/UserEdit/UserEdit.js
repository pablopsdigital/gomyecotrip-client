import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import './UserEdit.scss';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';
import {getOneUserForId, updateUser} from '../../../actions/userActions';
import {Button} from '../../../components/Button';
import LayoutAdmin from '../Dashboard/LayoutAdmin';

export default function UserEdit(props) {
  //Router and params
  const navigate = useNavigate();
  const params = useParams();
  const {id: userId} = params;

  //Data
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const resetError = () => {
    setError(null);
  };
  //Control inputs
  const [update, setUpdate] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isHosted, setIsHosted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchData();
  }, [setUpdate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getOneUserForId(userId);
      console.log(data);
      setUserData(data);

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setIsHosted(data.isHosted);
      setIsAdmin(data.isAdmin);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await updateUser({
        _id: userId,
        firstName,
        lastName,
        email,
        isHosted,
        isAdmin
      });
      navigate('/userlist');
      setLoading(false);
      setUpdate(update + 1);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
    setUpdate(update + 1);
  };

  //=======================================================================
  //Return
  //=======================================================================
  return (
    <LayoutAdmin>
      <div id="user-edit">
        <div className="content-page">
          <div className="container">
            <div className="header">
              <h1>Edit user Profile</h1>
            </div>
            <form className="form" onSubmit={submitHandler}>
              {!loading ? (
                <>
                  <div className="body">
                    <div>
                      <img className="image-avatar" src={userData.imageAvatar} />
                    </div>
                    <div>
                      <label htmlFor="firstName">First Nameddd</label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Enter name"
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
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>

                    <div className="row-inputs">
                      <div>
                        <label htmlFor="isHosted">Is Hosted</label>
                        <input
                          id="isHosted"
                          type="checkbox"
                          checked={isHosted}
                          onChange={(e) => setIsHosted(e.target.checked)}
                        ></input>
                      </div>
                      <div>
                        <label htmlFor="isAdmin">Is Admin</label>
                        <input
                          id="isAdmin"
                          type="checkbox"
                          checked={isAdmin}
                          onChange={(e) => setIsAdmin(e.target.checked)}
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="footer">
                    <Button outline onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button container type="submit">
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
