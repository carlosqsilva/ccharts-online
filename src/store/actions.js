import {
  TOGGLE_MODAL,
  DATA_LOADED,
  UPDATE_HEADER
} from "./constants"

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

const processCsv = (dataString, sep, decimal, header) => {
  let columns = []
  let data = dataString.trim().split(/\n/).map(row => row.split(sep).filter(val => val.length > 0))
  
  if (header) {
    columns = data[0]
    data = data.slice(1)
  } else {
    columns = data[0].map((val, i) => `X${i}`)
  }

  data = data.map(row => row.map(cell => Number(cell.trim().replace(decimal, "."))))
  
  return {data, columns}
}

const readFile = (file, delimiter, decimal, header) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      let dataString = reader.result
      let result = processCsv(dataString, delimiter, decimal, header)
      resolve({...result, dataString})
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
    readFile(file, delimiter, decimal, header).then(({data, columns, dataString}) => {
      dispatch(dataLoaded(data, columns, dataString))
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