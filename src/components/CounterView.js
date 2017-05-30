import React from 'react'
import PropTypes from 'prop-types'

const CounterView = ({ value, onIncrement, onDecrement }) => (
  <div>
    <button onClick={onIncrement}>Increment</button>
    {' '}
    <button onClick={onDecrement}>Decrement</button>
    <hr />
    <div>
      Clicked: <span className="value">{value}</span> times
    </div>
  </div>
)

CounterView.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
}

export default CounterView
