import {
  TOGGLE_MODAL,
  DATA_LOADED
} from "./constants"

const initialState = {
  closed: false,
  delimiter: ",",
  data: null,
  header: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        closed: !state.closed
      }
    case DATA_LOADED:
      return {
        ...state,
        data: action.data,
        header: action.header
      }
    default:
      return state
  }
}

export default rootReducer