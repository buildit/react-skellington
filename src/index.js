import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import configureStore from './redux/store'

import Root from './Root'

const store = configureStore({})

const renderClient = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('main')
  )
}

renderClient()

if (module.hot) {
  module.hot.accept('./Root', () => { renderClient() })
}
