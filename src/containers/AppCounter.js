import { connect } from 'react-redux'

import Counter from '../components/Counter'

import { incrementCounter, decrementCounter } from '../redux/actions'

const mapStateToProps = state => ({ value: state.counter.value })

const mapDispatchToProps = {
  onIncrement: incrementCounter,
  onDecrement: decrementCounter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
