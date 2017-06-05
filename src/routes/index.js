import React from 'react'
import PropTypes from 'prop-types'

import { Switch, Route, Redirect } from 'react-router'

// import App from '../containers/App'
import Login from '../containers/Login'
import Dashboard from '../containers/Dashboard'

import { checkDashboardAuthorization } from '../lib/check-auth'

const routes = store => (
  <div>
    <Switch>
      {/*<Route exact path="/" component={App} />*/}
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" store={store} component={Dashboard} />
    </Switch>
  </div>
)

const PrivateRoute = ({ component: Component, store, ...rest }) => (
  <Route {...rest} render={props => (
    checkDashboardAuthorization(store) ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} />
    )
  )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.component,
  store: PropTypes.object,
  location: PropTypes.string,
}

export default routes
