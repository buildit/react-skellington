import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import browserHistory from '../history'

import reducers from './reducers'

import sagaManager from '../sagas/manager'

const makeRootReducer = reducers => combineReducers({ ...reducers, router: routerReducer })

const sagaMiddleware = createSagaMiddleware()
const routeReduxMiddleware = routerMiddleware(browserHistory)

const middlewares = [routeReduxMiddleware, sagaMiddleware]

const storeEnhancers = []

// if(__DEV__) {
//   const DevTools = require("../containers/DevTools").default
//   // If the user has the "Redux DevTools" browser extension installed, use that.
//   // Otherwise, hook up the in-page DevTools UI component.
//   const debugEnhancer = window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
//   storeEnhancers.push(debugEnhancer)
// }

const middlewareEnhancer = applyMiddleware(...middlewares)
storeEnhancers.unshift(middlewareEnhancer)

export default (initialState) => {
  const composer = (window ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose)

  const store = createStore(
    makeRootReducer(reducers),
    initialState,
    composer(...storeEnhancers)
  )

  sagaManager.startSagas(sagaMiddleware)

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(makeRootReducer(reducers)))

    // This is murky and unverified - need contrived saga example to verify
    module.hot.accept('../sagas/manager', () => {
      sagaManager.cancelSagas(store)
      sagaManager.startSagas(sagaMiddleware)
    })
  }

  return store
}
