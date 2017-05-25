import {
  INCREMENT,
  DECREMENT,
  INCREMENT_IF_ODD,
} from './constants'

export const incrementCounter = () => ({ type: INCREMENT })
export const decrementCounter = () => ({ type: DECREMENT })
export const incrementCounterIfOdd = () => ({ type: INCREMENT_IF_ODD })
