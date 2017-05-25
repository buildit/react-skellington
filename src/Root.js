import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import history from './history'
import Routes from './routes'

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object,
}

export default Root
