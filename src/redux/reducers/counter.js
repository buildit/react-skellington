import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
} from '../constants'

console.log('flamingo')

const initialState = {
  value: 0,
}

const counter = (state = initialState, action) => {
  switch (action.type) {
  case INCREMENT:
    return { value: state.value + 1 }
  case DECREMENT:
    return { value: state.value - 1 }
  case INCREMENT_IF_ODD:
    return (state.value % 2 !== 0) ? { value: state + 1 } : state
  default:
    return state
  }
}

export default counter
