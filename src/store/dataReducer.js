import {
  TOGGLE_MODAL,
  DATA_LOADED,
  UPDATE_HEADER,
  UPDATE_DELIMITER,
  UPDATE_DECIMAL
} from "./constants"

const initialState = {
  closed: true,
  delimiter: ",",
  decimal: ".",
  dataString: "",
  data: null,
  header: false,
  columns: [],
}

const dataReducer = (state = initialState, action) => {
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
    case UPDATE_DELIMITER:
      return {
        ...state,
        data: action.data,
        columns: action.columns,
        delimiter: action.delimiter
      }
    case UPDATE_DECIMAL:
      return {
        ...state,
        data: action.data,
        columns: action.columns,
        decimal: action.decimal
      }
    default:
      return state
  }
}

export default dataReducer