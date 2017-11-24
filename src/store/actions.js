import {
  TOGGLE_MODAL,
  DATA_LOADED
} from "./constants"

export const toggle_modal = () => {
  return {
    type: TOGGLE_MODAL
  }
}

const dataLoaded = (data, header) => {
  return {
    type: DATA_LOADED,
    data,
    header
  }
}

const readCsv = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      let data = reader.result.trim().split(/\n/).map(row => row.split(",").map(cell => Number(cell.trim())))
      let header = ["v1","v1","v1","v1","v1"]
      data = data.slice(1)
      resolve({data, header})
    }
    reader.readAsText(file)
  })
}

export const loadData = (event) => {
  let file = event.target.files[0]
  return dispatch => {
    readCsv(file).then(({data, header}) => {
      let columns = header.map((val) => {return {Header: val}})
      dispatch(dataLoaded(data, columns))
    })
  }
} 
