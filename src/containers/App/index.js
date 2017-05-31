import React from 'react'

import Counter from '../Counter'

import styles from './style.scss'

console.dir(styles.siteWrapper, { colors: true, depth: null })

const App = () => (
  <div className='site-wrapper'>
    <h1>HAY HAY! BEEPLES PLARP PONK!!</h1>
    <div>
      <Counter />
    </div>
  </div>
)

export default App
