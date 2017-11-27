import {
  TOGGLE_MODAL,
  DATA_LOADED,
  UPDATE_HEADER,
  SET_CHART,
} from "./constants"

import {
  xbar_rbar,
  xbar_sbar,
  rbar,
  sbar,
  ewma,
  cusum
} from "./ccharts"

export const toggle_modal = () => {
  return {
    type: TOGGLE_MODAL
  }
}

const dataLoaded = (data, columns, dataString) => {
  return {
    type: DATA_LOADED,
    data,
    columns,
    dataString
  }
}

const updateHeader = (data, columns, header) => {
  return {
    type: UPDATE_HEADER,
    data,
    columns,
    header
  }
}

const setChart = (datasets, labels, title) => {
  return {
    type: SET_CHART,
    datasets,
    labels,
    title
  }
}

const processCsv = (dataString, sep, decimal, header) => {
  let columns = []
  let data = dataString.trim().split(/\n/).map(row => row.split(sep).filter(val => val.length > 0))
  
  if (header) {
    columns = data[0].map(_ => _.trim())
    data = data.slice(1)
  } else {
    columns = data[0].map((_, i) => `X${i}`)
  }

  data = data.map(row => row.map(cell => Number(cell.trim().replace(decimal, "."))))
  
  return {data, columns}
}

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      resolve(reader.result)
    }
    reader.readAsText(file)
  })
}

export const loadData = (event) => {

  let file = event.target.files[0]

  return (dispatch, getState) => {

    const {
      delimiter,
      decimal,
      header
    } = getState()
    
    readFile(file).then(dataString => {
      
      let result = processCsv(dataString, delimiter, decimal, header)
      dispatch(dataLoaded(result.data, result.columns, dataString))
    
    })
  }
}

export const setDelimiter = (event) => {
  let sep = [",", ",", " ", ":", ";"][event.target.selectedIndex]
  console.log(sep)
}

export const setHeader = (event) => {
  return (dispatch, getState) => {
    const {
      dataString,
      delimiter,
      decimal,
      header
    } = getState()
    let result = processCsv(dataString, delimiter, decimal, !header)
    dispatch(updateHeader(result.data, result.columns, !header))
  }
}

export const plot_Chart = (event) => {
  const chart = [null, xbar_rbar, xbar_sbar, rbar, sbar, ewma, cusum][event.target.selectedIndex]
  
  return (dispatch, getState) => {
    const { data } = getState()
    
    const labels = data.map((_, i) => i+1)

    const limits = {
      lineTension: 0,
      pointRadius: 0,
      backgroundColor: "#2eb872",
      fill: 2,
    }

    const points = {
      lineTension: 0,
      pointRadius: 3,
      borderColor: "#f54d42",
      pointBackgroundColor: "#f54d42",
      fill: false,
    }
    
    if (chart) {

      const {values, center, lcl, ucl, title, options} = chart(data)

      const lower = Array.isArray(lcl) ? lcl : labels.map(_ => lcl)
      const upper = Array.isArray(ucl) ? ucl : labels.map(_ => ucl)
      
      const datasets = [
        {...points, data: values},
        {...limits, ...options, data: lower},
        {...limits, ...options, data: upper}        
      ]
      
      dispatch(setChart(datasets, labels, title))
    }
  }
}

export const setTarget = () => {

}