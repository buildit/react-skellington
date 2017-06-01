import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import configureStore from './redux/store'

import Root from './Root'

const store = configureStore({})

const renderClient = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('main')
  )
}

renderClient(Root)

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default
    renderClient(NewRoot)
  })
}
