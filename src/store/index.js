import * as type from "./constants"
import { combineReducers } from "redux"

const initialState = {
  closed: true,
  delimiter: ",",
  decimal: ".",
  dataString: "",
  data: false,
  header: false,
  columns: []
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.TOGGLE_MODAL:
      return {
        ...state,
        closed: !state.closed
      }
    case type.DATA_LOADED:
      return {
        ...state,
        data: action.data,
        columns: action.columns,
        dataString: action.dataString
      }
    case type.UPDATE_HEADER:
      return {
        ...state,
        data: action.data,
        columns: action.columns,
        header: action.header
      }
    case type.UPDATE_DELIMITER:
      return {
        ...state,
        data: action.data,
        columns: action.columns,
        delimiter: action.delimiter
      }
    case type.UPDATE_DECIMAL:
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

const plotState = {
  labels: [1, 2, 3, 4],
  datasets: [],
  title: "",
  ticks: {
    ucl: 12,
    center: 10,
    lcl: 8
  },
  chart: false,
  error: false,
  errorMessage: ""
}

const plotReducer = (state = plotState, action) => {
  switch (action.type) {
    case type.SET_CHART:
      return {
        ...state,
        labels: action.labels,
        datasets: action.datasets,
        title: action.title,
        ticks: action.ticks,
        chart: true,
        error: false
      }
    case type.SHOW_MESSAGE:
      return {
        ...state,
        error: true,
        errorMessage: action.message
      }
    default:
      return state
  }
}

const root = combineReducers({
  data: dataReducer,
  plot: plotReducer
})

export default root
