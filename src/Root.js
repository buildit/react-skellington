import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import history from './history'
import routes from './routes'

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>{ routes() }</div>
    </ConnectedRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object,
}

export default Root
