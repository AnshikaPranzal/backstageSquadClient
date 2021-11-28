/* eslint-disable no-unused-vars */
import React from 'react';

import { ThemeProvider } from '@emotion/react';

import theme from './theme/Theme';
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage';
import SignUp from './components/SignUp';
import Base from './utility/Base';
import Login from './components/Login';
import EventForm from './components/pages/forms/EventForm';
import IdeaForm from './components/pages/forms/IdeaForm';
import EventPage from './components/pages/EventPage';
import { useDispatch, useSelector } from 'react-redux';
import SearchContent from './components/SearchContent';
import VenueForm from './components/pages/forms/VenueForm';
import SpeakerForm from './components/pages/forms/SpeakerForm';
import TeacherForm from './components/pages/forms/TeacherForm';
import { Cube } from 'styled-loaders-react';
import { setErrorMsg, setLoader, setSuccessMsg } from './action/action';
import { Alert, Snackbar } from '@mui/material';

function Routes() {
  const userName = useSelector(state => state?.user?.name);
  const loader = useSelector(state => state?.loader);
  const errorMsg = useSelector(state => state?.errorMsg);
  const successMsg = useSelector(state => state?.successMsg);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setLoader(false))
    }, 3000);
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorMsg(''))
    dispatch(setSuccessMsg(''))
  };
  return (
    <ThemeProvider theme={theme}>
      {!loader? 
      <BrowserRouter>
        <Base>
          <Switch>
          {(userName && userName !== '')?
            <Route exact path="/" component={LandingPage} />:
            <Route exact path="/" component={Login} />
          }   
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create/event" component={EventForm} />
            <Route exact path="/event/:eventId" component={EventPage} />
            <Route exact path="/create/idea" component={IdeaForm} />
            <Route exact path="/search" component={SearchContent} />
            <Route exact path="/create/venue" component={VenueForm} />
            <Route exact path="/create/speaker" component={SpeakerForm} />
            <Route exact path="/upgrade/teacher" component={TeacherForm} />
          </Switch>
        </Base>
    </BrowserRouter>
    :
    <Cube color="red" size="60px" duration="5s"></Cube>
    }
    <Snackbar open={successMsg?.length>0} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={errorMsg?.length>0} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Routes;
