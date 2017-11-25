import {
  TOGGLE_MODAL,
  DATA_LOADED,
  UPDATE_HEADER
} from "./constants"

const initialState = {
  closed: false,
  delimiter: ",",
  decimal: ".",
  dataString: " ",
  data: null,
  header: false,
  columns: []
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
        columns: action.columns,
        dataString: action.dataString
      }
    case UPDATE_HEADER:
      return {
        ...state,
        data: action.data,
        columns: action.columns,
        header: action.header
      }
    default:
      return state
  }
}

export default rootReducer