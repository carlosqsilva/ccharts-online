import {
  TOGGLE_MODAL
} from "./constants"

const initialState = {
  closed: false,
  delimiter: ",",
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        closed: !state.closed
      }
    default:
      return state
  }
}

export default rootReducer