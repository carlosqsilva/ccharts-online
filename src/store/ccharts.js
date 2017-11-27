// TABLES
const A2 = [0, 0, 1.880, 1.023, 0.729, 0.577, 0.483, 0.419, 0.373, 0.337, 0.308]
const D3 = [0, 0, 0,     0,     0,     0,     0,     0.076, 0.136, 0.184, 0.223]
const D4 = [0, 0, 3.267, 2.575, 2.282, 2.115, 2.004, 1.924, 1.864, 1.816, 1.777]

const avg = (arr) => {
  return arr.reduce((a,b) => a+b)/arr.length;
}

export const xbar_rbar = (data) => {
  const title = "XBAR Rbar"
  const options = {}
  
  const size = data[0].length
  let R = []
  let values = [] // X

  for (const row of data) {
     R.push(Math.max(...row) - Math.min(...row))
     values.push(avg(row))
  }

  const Rbar = avg(R) 
  const center = avg(values)

  const lcl = center - A2[size] * Rbar
  const ucl = center + A2[size] * Rbar

  return {values, center, lcl, ucl, title, options}
}

export const xbar_sbar = () => {

}

export const rbar = (data) => {
  const title = "Rbar"
  const options = {}
  
  let size = data[0].length
  let values = []

  for (const row of data) {
    values.push(Math.max(row) - Math.min(row))
  }

  const center = avg(values)

  const lcl = D3[size] * center
  const ucl = D4[size] * center

  return {values, center, lcl, ucl, title, options}
}

export const sbar = () => {

}

export const ewma = (data) => {
  const title = "EWMA"
  const options = {steppedLine: true}

  const weight = 0.2

  if (data[0].length > 1){
    data = data.map(row => avg(row))
  }

  const center = avg(data)

  let rbar = []
  for (let i = 0; i < (data.length - 1); i++) {
    rbar.push(Math.abs(data[i] - data[i + 1]))
  }
  const std = avg(rbar) / 1.128

  let values = []
  let j = center
  for (const x of data) {
    values.push(weight * x + (1 - weight) * j)
    j = values[values.length - 1]
  }

  let lcl = []
  let ucl = []

  for (let z = 1; z <= (data.length +1); z++) {
    lcl.push(center - 3 * (std) * Math.sqrt((weight / (2 - weight)) * (1 - (1 - weight)**(2 * z))))
    ucl.push(center + 3 * (std) * Math.sqrt((weight / (2 - weight)) * (1 - (1 - weight)**(2 * z))))
  }

  return {values, center, lcl, ucl, title, options}

}

export const cusum = (data) => {
  const title = "CUSUM"
  const options = {}

  if (data[0].length > 1) {
    data = data.map(row => avg(row))
  }

  const target = avg(data)

  let rbar =[]
  for (let i = 0; i < (data.length - 1); i++) {
    rbar.push(Math.abs(data[i] - data[i + 1]))
  }
  
  const std = avg(rbar) / 1.128
  const k = std / 2

  let cplus = []
  let cminus = []
  let j = 0
  let z = 0

  for (const xi of data) {
    cplus.push(Math.max(0, xi - (target + k) + j))
    cminus.push(Math.max(0, xi - (target - k) - z))
    j = cplus[cplus.length - 1]
    z = cminus[cminus.length - 1]
  }

  const lcl = 4 * std
  const ucl = 4 * std
  center = 0


  return {}
}
