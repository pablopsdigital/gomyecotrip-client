import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import Brand from '../../resources/svg/gomyecotrip-symbol.svg';
import {Link} from 'react-router-dom';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Components
import SearchAvailability from './SearchAvailability/SearchAvailability';
import useAuthUserContext from '../../hooks/useAuthUser';

export default function Navbar() {
  const [isOpenHamburger, setIsOpenHamburger] = useState(false);

  //=====================================================================
  //Load data
  //=====================================================================
  const {signout, userInfo} = useAuthUserContext();

  const signoutHandler = () => {
    signout();
  };

  //=====================================================================
  //Modal
  //=====================================================================
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => setModalOpen(false));

  // Hook
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  //=====================================================================
  //Return
  //=====================================================================
  return (
    <header>
      <Nav>
        <Logo href="/">
          <img src={Brand} alt="brand-gomyecotrip" />
          Gomyecotrip
        </Logo>
        <SearchAvailability />
        <Hamburger onClick={() => setIsOpenHamburger(!isOpenHamburger)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu isOpen={isOpenHamburger}>
          {userInfo && userInfo.isHosted === true ? (
            <></>
          ) : (
            <MenuLink to="/host/welcome">offers an experience</MenuLink>
          )}
          <Avatar onClick={() => setModalOpen(true)}>
            <MenuIcon />
            {userInfo ? (
              <div className="avatar">
                <img src={userInfo.imageAvatar} />
              </div>
            ) : (
              <AccountCircleIcon />
            )}
          </Avatar>

          {isModalOpen && (
            <Dropdown ref={ref}>
              {userInfo ? (
                <>
                  <h3>Hi! {userInfo.firstName}</h3>
                  <Link to="/profile">User Profile</Link>
                  <Link to="/booking-history">Booking History</Link>
                  <Link to="/support">Support</Link>
                </>
              ) : (
                <>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/signin">Sing In</Link>
                  <hr />
                  <Link to="/host/welcome">Offers an experience</Link>
                  <Link to="/support">Support</Link>
                </>
              )}

              {/* ishosted ============ */}
              {userInfo && userInfo.isHosted && (
                <>
                  <hr />
                  <Link to="/bookinglist/hosted">Dashboard Hosted</Link>
                </>
              )}

              {/* isAdmin ============ */}
              {userInfo && userInfo.isAdmin && (
                <>
                  <hr />
                  <Link to="/bookinglist">Dashboard Admin</Link>
                </>
              )}
              {/* Footer */}
              {userInfo && (
                <>
                  <hr />
                  <Link to="/" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </>
              )}
            </Dropdown>
          )}
        </Menu>
      </Nav>
    </header>
  );
}

const Nav = styled.div`
  margin-bottom: 1rem;
  height: 90px;
  position: fixed;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  border: 1px solid #e5e5e55c;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
`;

const Dropdown = styled.div`
  position: absolute;
  top: 70px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  height: auto;
  width: 300px;
  box-shadow: rgb(0 0 0/15%) 0px 16px 32px, rgb(0 0 0 /10%) 0px 3px 8px;
  hr {
    width: 100%;
    border: none;
    padding: 0;
    overflow: hidden;
    height: 1px;
    background: #e5e5e5;
    margin: 0.5rem 0;
  }
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background-color: var(--bg-white);
  border: 2px solid var(--primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-total);
  cursor: pointer;

  .avatar {
    width: 30px;
    height: 30px;
    img {
      border-radius: 50px;
    }
  }
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: var(--primary);
  text-decoration: none;
  font-weight: var(--weight-blod);
  font-size: 1.7rem;
  img {
    width: 2rem;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
`;

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: var(--text-black);
  transition: all 0.3s ease-in;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    color: var(--primary-hover);
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({isOpen}) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
