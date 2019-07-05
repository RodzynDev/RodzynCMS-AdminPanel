import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import Auth from './Modules/Auth';

import 'normalize.css';

import Login from './Components/Login';
import Panel from './Components/Panel';

const RodzynCMSAdmin = () => (
  <Router>
    <Switch>
      <GuestRoute path='/login' component={Login} />
      <PrivateRoute path='/' component={Panel} />
    </Switch>
  </Router>
)

const checkJWTValid = () => {
  let status = Auth.JTWValidator()

  return status;
}

const GuestRoute = ({ component: Component, ...rest }) => {
  if(localStorage.getItem("tokenLogin")) {
    return <Redirect to='/'/>
  } 

  return <Route {...rest} component={Component} />
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchJTW(){
      setLoggedIn(await checkJWTValid())
      setIsLoading(false);
    } 

    fetchJTW()
  }, []);

  if(isLoading)
  {
    return <div>Test..</div>;
  }

  return <Route {...rest} render={(props) => (
    isLoggedIn
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
};

export default RodzynCMSAdmin;

// Więc musisz sprawdzić czy ma token. Jeśli ma -> przerzuć do "/", później w "/" PrivateRoute sobie zweryfikuje ten token. Jeśli się okaże nie poprawny, to znów go przekieruje do logowania.