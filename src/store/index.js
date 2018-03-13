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
  datasets: [
    {
      data: [7.5, 12.5, 7.5, 10],
      lineTension: 0,
      borderColor: "#003459",
      pointRadius: 3,
      pointBorderWidth: 0,
      pointBackgroundColor: ["#f54d42", "#f54d42", "#f54d42", "#259f6c"],
      fill: false
    },
    {
      data: [10, 10, 10, 10],
      lineTension: 0,
      pointRadius: 0,
      fill: false
    },
    {
      data: [12, 12, 12, 12],
      lineTension: 0,
      pointRadius: 0,
      borderColor: "#ee2b47",
      borderWidth: 2,
      fill: 1
    },
    {
      data: [8, 8, 8, 8],
      lineTension: 0,
      pointRadius: 0,
      borderColor: "#ee2b47",
      borderWidth: 2,
      fill: 1
    }
  ],
  title: "",
  ticks: {
    ucl: 12,
    center: 10,
    lcl: 8
  },
  displayInfo: false,
  displayAlarm: false
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
        displayInfo: true,
        displayAlarm: false
      }
    case type.DISPLAY_ALARM:
      return {
        ...state,
        displayAlarm: action.display
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
