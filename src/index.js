import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './Services/Store';
import browserHistory from './Services/History';
import { Router, Route, IndexRoute } from 'react-router';
import { isLoggedIn, isGuest } from './Services/AuthMiddleware';

// contexts
import App from './Contexts/App';
import Login from './Contexts/Login';
import Dashboard from './Contexts/Dashboard';
import DashboardNav from './Contexts/DashboardNav';

// start rendering the application
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route component={DashboardNav} onEnter={isLoggedIn(store)}>
          <Route path='/' component={Dashboard} />
        </Route>
        <Route onEnter={isGuest(store)}>
          <Route path='/login' component={Login} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app')
);
