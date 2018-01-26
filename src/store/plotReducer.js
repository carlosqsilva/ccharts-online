import { SET_CHART, DISPLAY_ALARM } from "./constants"

const initialState = {
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

const plotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHART:
      return {
        ...state,
        labels: action.labels,
        datasets: action.datasets,
        title: action.title,
        ticks: action.ticks,
        displayInfo: true,
        displayAlarm: false
      }
    case DISPLAY_ALARM:
      return {
        ...state,
        displayAlarm: action.display
      }
    default:
      return state
  }
}

export default plotReducer
