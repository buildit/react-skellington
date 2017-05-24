import React from 'react'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import app from './redux/reducers'

import App from './containers/App';

let store = createStore(app)

// <Provider store={store}>
//   <Router history={history} routes={routes(store)} />
// </Provider>

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root
