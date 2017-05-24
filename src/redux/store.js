import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'
import history from './history'

export default (initialState) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const middleware = routerMiddleware(history)

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    initialState,
    composeEnhancers(applyMiddleware(middleware)),
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
