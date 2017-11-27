import {
  TOGGLE_MODAL,
  DATA_LOADED,
  UPDATE_HEADER,
  SET_CHART
} from "./constants"

const initialState = {
  closed: true,
  delimiter: ",",
  decimal: ".",
  dataString: " ",
  data: null,
  header: false,
  columns: [],
  labels: [1, 2, 3, 4, 5, 6],
  datasets: [{
    data: [12, 19, 3, 5, 2, 3],
    lineTension: 0,
    pointRadius: 0,
    fill: 1,
  },
  {
    data: [6, 9, 1, 2, 1 ,1],
    lineTension: 0,
    pointRadius: 0,
    fill: 1
  }],
  title: ""
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
    case SET_CHART:
      return {
        ...state,
        labels: action.labels,
        datasets: action.datasets,
        title: action.title
      }
    default:
      return state
  }
}

export default rootReducer