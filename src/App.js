import React from 'react';
import './App.scss';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

//Routes
import AdminRoute from './components/routes/AdminRoute';
import HostedRoute from './components/routes/HostedRoute';
import PrivateRoute from './components/routes/PrivateRoute';

//Pages
import Home from './pages/Home/Home';
import Experience from './pages/Experience/Experience';
import SignIn from './pages/Auth/SignIn/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import Checkout from './pages/Checkout/Checkout';
import UserBookingDetail from './pages/UserProfile/UserBookingDetail/UserBookingDetail';
import UserBookingHistory from './pages/UserProfile/UserBookingHistory/UserBookingHistory';
import UserProfile from './pages/UserProfile/UserProfile';
import ExperienceList from './pages/Admin/ExperienceList/ExperienceList';
import ExperienceEdit from './pages/Admin/ExperienceEdit/ExperienceEdit';
import AdminBookingList from './pages/Admin/BookingList/BookingList';
import UserList from './pages/Admin/UserList/UserList';
import UserEdit from './pages/Admin/UserEdit/UserEdit';
import HostProfile from './pages/Host/HostProfile/HostProfile';
import AdminDashboard from './pages/Admin/Dashboard/Dashboard';

import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import Experiences from './pages/Experiences/Experiences';
import Error404 from './pages/Error404/Error404';
import LandingWelcomeHost from './pages/LandingWelcomeHost/LandingWelcomeHost';
import UserSaveExperiences from './pages/UserProfile/UserSaveExperiences/UserSaveExperiences';
import UserChangePassword from './pages/UserProfile/UserChangePassword/UserChangePassword';
import SignOut from './pages/Auth/SignOut/SignOut';
import ExperienceCreate from './pages/Admin/ExperienceEdit/ExperienceCreate';
import HostEdit from './pages/Admin/HostEdit/HostEdit';
import PaySuccess from './pages/Checkout/PaySuccess/PaySuccess';
import PayError from './pages/Checkout/PayError/PayError';
import Support from './pages/StaticPages/Support';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />

        {/* <Route path="/experiences/:location/:date/:hour" element={<Experiences />}></Route> */}
        {/* Bookings */}
        <Route path="/booking/:id" element={<UserBookingDetail />}></Route>
        {/* Host */}
        <Route path="/hosted/:id" element={<HostProfile />}></Route>
        <Route path="/host/welcome" element={<LandingWelcomeHost />}></Route>
        {/* Experiences */}
        <Route path="/experiences" element={<Experiences />}>
          <Route path="/experiences/:place/:date/:hour" element={<Experiences />}></Route>
        </Route>
        <Route path="/experience/:id/" element={<Experience />}>
          <Route path="/experience/:id/:place/:date/:hour" element={<Experience />}></Route>
        </Route>
        <Route path="/experience/:id/edit" element={<ExperienceEdit />}></Route>
        <Route path="/experience/create" element={<ExperienceCreate />}></Route>
        {/* User */}
        <Route path="/save-experiences" element={<UserSaveExperiences />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/checkout/:experienceid" element={<Checkout />}></Route>
        <Route path="/pay-success" element={<PaySuccess />}></Route>
        <Route path="/pay-error" element={<PayError />}></Route>
        <Route path="/booking-history" element={<UserBookingHistory />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/support" element={<Support />}></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/host-profile"
          element={
            <PrivateRoute>
              <HostEdit />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/signout"
          element={
            <PrivateRoute>
              <SignOut />
            </PrivateRoute>
          }
        ></Route>
        {/* <Route
          path="/map"
          element={
            <PrivateRoute>
              <MapScreen />
            </PrivateRoute>
          }
        ></Route> */}
        <Route
          path="/experiencelist"
          element={
            <AdminRoute>
              <ExperienceList />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/bookinglist"
          element={
            <AdminRoute>
              <AdminBookingList />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/userlist"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/user/:id/edit"
          element={
            <AdminRoute>
              <UserEdit />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/experiencelist/hosted"
          element={
            <HostedRoute>
              <ExperienceList />
            </HostedRoute>
          }
        ></Route>
        <Route
          path="/bookinglist/hosted"
          element={
            <HostedRoute>
              <AdminBookingList />
            </HostedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
