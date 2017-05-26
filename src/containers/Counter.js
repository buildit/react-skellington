import { connect } from 'react-redux'

import CounterView from '../components/CounterView'

import { incrementCounter, decrementCounter } from '../redux/actions'

const mapStateToProps = state => ({ value: state.counter.value })

const mapDispatchToProps = {
  onIncrement: incrementCounter,
  onDecrement: decrementCounter,
}

const Counter = connect(mapStateToProps, mapDispatchToProps)(CounterView)

export default Counter
