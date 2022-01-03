import React, {useState, useEffect, useRef} from 'react';
import './UserCard.scss';
import FeedIcon from '@mui/icons-material/Feed';
import {Button} from '../Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Navigate, useNavigate} from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {deleteUser} from '../../actions/userActions';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';

export default function UserCard({user, deleteAction, ...props}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const resetError = () => setError(null);

  const [userModalDelete, setUserModalDelete] = useState(false);

  const handleDeleteUser = () => {
    handlerDeleteUser();
    setUserModalDelete(false);
  };

  const handlerDeleteUser = async () => {
    try {
      setLoading(true);
      const data = await deleteUser(user._id);

      setLoading(false);
      deleteAction();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div id="user-card">
      <div className="user-card">
        <div className="col-1">
          <img src={user.imageAvatar} />
        </div>
        <div className="col-2">
          <h4>ID</h4>
          <p>{user._id}</p>
          <p className="date">Member sinze: {moment(user.createdAt).startOf().fromNow()}</p>
        </div>
        <div className="col-3">
          <h4>Name</h4>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p>{user.email}</p>
        </div>
        <div className="col-4">
          <h4>Roles</h4>
          <p>{user.isAdmin ? 'Admin' : ''}</p>
          <p>{user.isHosted ? 'Hosted' : ''}</p>
          <p>{!user.isHosted && !user.isAdmin ? 'none' : ''}</p>
        </div>
        <div className="col-5">
          <button
            className="delete"
            onClick={() => {
              setUserModalDelete(true);
            }}
          >
            <DeleteIcon />
          </button>
          <button className="edit" onClick={() => navigate(`/user/${user._id}/edit`)}>
            <EditIcon />
          </button>
        </div>

        {/* ====================================================================================
        Picker Dates
        ==================================================================================== */}
        {userModalDelete && (
          <div id="modal-delete">
            <div className="overlay"></div>
            <div className="modal">
              <div className="modal-dates-panel-inner">
                <h4 className="dual-picker-panel-title">Delete User</h4>
                <div className="body">
                  <ErrorOutlineIcon className="icon" />
                </div>
                <div className="footer">
                  <Button contained onClick={handleDeleteUser}>
                    Detele
                  </Button>
                  <Button outline onClick={() => setUserModalDelete(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
