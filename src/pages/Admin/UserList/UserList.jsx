import React, {useEffect, useState} from 'react';
import './UserList.scss';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {Button} from '../../../components/Button';
import {useNavigate} from 'react-router-dom';
import {deleteUser, getAllUsers, updateUser} from '../../../actions/userActions';
import AddIcon from '@mui/icons-material/Add';
import {makeStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import UserCard from '../../../components/UserCard/UserCard';
import LayoutAdmin from '../Dashboard/LayoutAdmin';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';

export default function UserList(props) {
  //Data
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteAction, setDeleteAction] = useState(0);

  const updateDelteAction = () => {
    setDeleteAction(deleteAction + 1);
  };

  const getDataUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsersData(data.users);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  //Effect
  useEffect(() => {
    getDataUsers();
  }, [deleteAction, setDeleteAction]);

  return (
    <LayoutAdmin>
      <div id="user-list">
        <div className="header-admin-page">
          <h2 className="title">User list</h2>
          {/* <Button>
            <AddIcon />
            Insertar
          </Button> */}
        </div>

        <div className="content">
          {!loading ? (
            <div className="card-list grid">
              {usersData.map((user, index) => (
                <UserCard key={user._id} user={user} deleteAction={updateDelteAction} />
              ))}
            </div>
          ) : (
            !loading && <NoResultsFound />
          )}
        </div>

        <div className="footer"></div>
        {/*Loading and errors */}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </div>
    </LayoutAdmin>
  );
}
