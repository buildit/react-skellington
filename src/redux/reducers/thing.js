const things = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_THING':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE_THING':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed,
      })

    default:
      return state
  }
}

export default things
