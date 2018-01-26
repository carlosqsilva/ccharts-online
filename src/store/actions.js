import {
  TOGGLE_MODAL,
  DATA_LOADED,
  UPDATE_HEADER,
  UPDATE_DELIMITER,
  UPDATE_DECIMAL,
  SET_CHART,
  DISPLAY_ALARM
} from "./constants"

import { xbar_rbar, xbar_sbar, rbar, sbar, ewma, cusum } from "./ccharts"

export const toggle_modal = () => ({
  type: TOGGLE_MODAL
})

const dataLoaded = (data, columns, dataString) => ({
  type: DATA_LOADED,
  data,
  columns,
  dataString
})

const updateHeader = (data, columns, header) => ({
  type: UPDATE_HEADER,
  data,
  columns,
  header
})

const updateDelimiter = (data, columns, delimiter) => ({
  type: UPDATE_DELIMITER,
  data,
  columns,
  delimiter
})

const updateDecimal = (data, columns, decimal) => ({
  type: UPDATE_DECIMAL,
  data,
  columns,
  decimal
})

const setChart = (datasets, labels, title, ticks) => ({
  type: SET_CHART,
  datasets,
  labels,
  title,
  ticks
})

const displayAlarm = display => ({
  type: DISPLAY_ALARM,
  display
})

const processCsv = (dataString, sep, decimal, header) => {
  let columns = ["__"]
  let data = dataString
    .trim()
    .split(/\n/)
    .map(row => row.split(sep).filter(val => val.length > 0))

  if (header) {
    columns = columns.concat(data[0].map(_ => _.trim()))
    data = data.slice(1)
  } else {
    columns = columns.concat(data[0].map((_, i) => `X${i}`))
  }

  data = data.map(row => row.map(cell => Number(cell.trim().replace(decimal, "."))))

  return { data, columns }
}

const readFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      resolve(reader.result)
    }
    reader.readAsText(file)
  })
}

export const loadData = event => {
  let file = event.target.files[0]

  return (dispatch, getState) => {
    const { delimiter, decimal, header } = getState().data

    readFile(file).then(dataString => {
      let result = processCsv(dataString, delimiter, decimal, header)
      dispatch(dataLoaded(result.data, result.columns, dataString))
    })
  }
}

export const set_Delimiter = event => {
  let delimiter = [",", ",", " ", ":", ";"][event.target.selectedIndex]
  return (dispatch, getState) => {
    const { dataString, decimal, header } = getState().data

    let result = processCsv(dataString, delimiter, decimal, header)
    dispatch(updateDelimiter(result.data, result.columns, delimiter))
  }
}

export const set_Decimal = event => {
  let decimal = [".", ".", ","][event.target.selectedIndex]
  return (dispatch, getState) => {
    const { dataString, delimiter, header } = getState().data

    let result = processCsv(dataString, delimiter, decimal, header)
    dispatch(updateDecimal(result.data, result.columns, decimal))
  }
}

export const set_Header = event => {
  return (dispatch, getState) => {
    const { dataString, delimiter, decimal, header } = getState().data

    let result = processCsv(dataString, delimiter, decimal, !header)
    dispatch(updateHeader(result.data, result.columns, !header))
  }
}

export const plot_Chart = event => {
  const chart = [null, xbar_rbar, xbar_sbar, rbar, sbar, ewma, cusum][event.target.selectedIndex]

  return (dispatch, getState) => {
    const { data } = getState().data

    if (!data) {
      dispatch(displayAlarm(true))
    } else {
      if (chart) {
        const labels = data.map((_, i) => i + 1)

        const { datasets, title, ticks } = chart(data)
        dispatch(setChart(datasets, labels, title, ticks))
      }
    }
  }
}
