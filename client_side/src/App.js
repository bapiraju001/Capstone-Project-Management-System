import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SigninPage from "./pages/SigninPage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PageNotFound from './pages/PageNotFound';
import DashBoardPage from './pages/DashBoardPage';
import ProjectPage from 'pages/ProjectPage';
import jwt_decode from 'jwt-decode';
import CoursesPage from 'pages/CoursesPage';
import CoursePage from 'pages/CoursePage';
import Test from 'pages/Test';
import PreferenceForm from 'components/forms/PreferenceForm';

function App() {

  const isAdmin = (nextState, replace) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
      if (role !== "ADMIN") {
        replace({
          pathname: '/dashboard',
          state: { nextPathname: nextState.location.pathname },
        });
      } 
    } catch (err) {
      replace({
        pathname: '/signin',
        state: { nextPathname: nextState.location.pathname },
      });
    } 
  }

  const isLoggedIn = (nextState, replace) => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const decodedToken = jwt_decode(token);
      const role = decodedToken.role;
    } catch (err) {
      replace({
        pathname: '/signin',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/project" element={<ProjectPage />} onEnter={isAdmin} />
        <Route path="/dashboard" element={<DashBoardPage />} onEnter={isLoggedIn} />
        <Route path="/courses" element={<CoursesPage />} onEnter={isLoggedIn} />
        <Route path="/courses/:name" element={<CoursePage />}  onEnter={isLoggedIn} />
        <Route path="/test" element={<Test />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
