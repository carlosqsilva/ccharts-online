import charts from "./charts"
import * as type from "./constants"

export const toggle_modal = () => ({
  type: type.TOGGLE_MODAL
})

const dataLoaded = (data, columns, dataString) => ({
  type: type.DATA_LOADED,
  data,
  columns,
  dataString
})

const updateHeader = (data, columns, header) => ({
  type: type.UPDATE_HEADER,
  data,
  columns,
  header
})

const updateDelimiter = (data, columns, delimiter) => ({
  type: type.UPDATE_DELIMITER,
  data,
  columns,
  delimiter
})

const updateDecimal = (data, columns, decimal) => ({
  type: type.UPDATE_DECIMAL,
  data,
  columns,
  decimal
})

const setChart = (datasets, labels, title, ticks) => ({
  type: type.SET_CHART,
  datasets,
  labels,
  title,
  ticks
})

const showMessage = message => ({
  type: type.SHOW_MESSAGE,
  message
})

const processCSV = async (dataString, sep, decimal, header) => {
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

  data = data.map(row =>
    row.map(cell => Number(cell.trim().replace(decimal, ".")))
  )

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

export const loadData = event => async (dispatch, getState) => {
  let file = event.target.files[0]
  const { delimiter, decimal, header } = getState().data
  const dataString = await readFile(file)
  const { data, columns } = await processCSV(
    dataString,
    delimiter,
    decimal,
    header
  )
  dispatch(dataLoaded(data, columns, dataString))
}

export const set_Delimiter = event => async (dispatch, getState) => {
  let delimiter = [",", ",", " ", ":", ";"][event.target.selectedIndex]
  const { dataString, decimal, header } = getState().data
  const { data, columns } = await processCSV(
    dataString,
    delimiter,
    decimal,
    header
  )
  dispatch(updateDelimiter(data, columns, delimiter))
}

export const set_Decimal = event => async (dispatch, getState) => {
  let decimal = [".", ".", ","][event.target.selectedIndex]
  const { dataString, delimiter, header } = getState().data
  const { data, columns } = await processCSV(
    dataString,
    delimiter,
    decimal,
    header
  )
  dispatch(updateDecimal(data, columns, decimal))
}

export const set_Header = event => async (dispatch, getState) => {
  const { dataString, delimiter, decimal, header } = getState().data

  const { data, columns } = await processCSV(
    dataString,
    delimiter,
    decimal,
    !header
  )
  dispatch(updateHeader(data, columns, !header))
}

export const plot_Chart = event => async (dispatch, getState) => {
  const chart = charts[event.target.value] || null
  const { data } = getState().data

  if (!data) dispatch(showMessage("You firts need to import a dataset."))
  else {
    if (chart) {
      const labels = data.map((_, i) => i + 1)
      try {
        const { datasets, title, ticks } = await chart(data)
        dispatch(setChart(datasets, labels, title, ticks))
      } catch (err) {
        dispatch(showMessage(err.message))
      }
    }
  }
}

export const load_sample = event => async dispatch => {
  let value = event.target.value
  let text

  if (value === "P") text = await import("./example/p")
  else if (value === "NP") text = await import("./example/np")
  else if (value === "C") text = await import("./example/c")
  else if (value === "U") text = await import("./example/u")
  else if (value === "MEWMA") text = await import("./example/mewma")
  else text = await import("./example/example")

  if (text.data) text = text.data

  const { data, columns } = await processCSV(text, ",", ".", true)
  dispatch(dataLoaded(data, columns, text))
}
