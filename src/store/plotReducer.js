import {
  SET_CHART
} from "./constants"

const initialState = {
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
  title: "",
  ticks: {
    ucl: 19,
    center: 10,
    lcl: 2
  },
  displayInfo: false
}

const plotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHART:
      return {
        ...state,
        labels: action.labels,
        datasets: action.datasets,
        title: action.title,
        ticks: action.ticks,
        displayInfo: true
      }
    default:
      return state
  }
}

export default plotReducer