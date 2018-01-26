// TABLES
const A2 = [0, 0, 1.88, 1.023, 0.729, 0.577, 0.483, 0.419, 0.373, 0.337, 0.308]
const A3 = [0, 0, 2.659, 1.954, 1.628, 1.427, 1.287, 1.182, 1.099, 1.032, 0.975, 0.927, 0.886, 0.85, 0.817, 0.789]
const D3 = [0, 0, 0, 0, 0, 0, 0, 0.076, 0.136, 0.184, 0.223]
const D4 = [0, 0, 3.267, 2.575, 2.282, 2.115, 2.004, 1.924, 1.864, 1.816, 1.777]
const B3 = [0, 0, 0, 0, 0, 0, 0.03, 0.118, 0.185, 0.239, 0.284, 0.321, 0.354, 0.382, 0.406, 0.428]
const B4 = [0, 0, 3.267, 2.568, 2.266, 2.089, 1.97, 1.882, 1.815, 1.761, 1.716, 1.679, 1.646, 1.618, 1.594, 1.572]

const limits = {
  lineTension: 0,
  pointRadius: 0,
  borderColor: "#ee2b47",
  borderWidth: 2,
  fill: "+1"
}

const middle = {
  lineTension: 0,
  pointRadius: 0,
  fill: false
}

const points = {
  lineTension: 0,
  pointRadius: 3,
  pointHoverRadius: 6,
  borderWidth: 2,
  borderColor: "#003459",
  pointBorderWidth: 0,
  pointBackgroundColor: "#259f6c",
  fill: false
}

const repeat = (value, size) => Array(size).fill(value)

const pointsColor = (ucl, lcl, values) => values.map((val, i) => (val > ucl || val < lcl ? "#f54d42" : "#259f6c"))

const avg = (arr, ddof = 0) => arr.reduce((a, b) => a + b) / (arr.length - ddof)

const variance = (arr, ddof = 0) => {
  return avg(arr.map(x => Math.pow(x - avg(arr), 2)), ddof)
}

const standardDeviation = (arr, ddof = 0) => Math.sqrt(variance(arr, ddof))

export const xbar_rbar = data => {
  const sampleSize = data[0].length
  const size = data.length

  let R = []
  let values = [] // X

  for (const row of data) {
    R.push(Math.max(...row) - Math.min(...row))
    values.push(avg(row))
  }

  const Rbar = avg(R)
  const center = avg(values)

  const lcl = center - A2[sampleSize] * Rbar
  const ucl = center + A2[sampleSize] * Rbar

  return {
    title: "XBAR Rbar",
    ticks: {
      ucl,
      center,
      lcl
    },
    datasets: [
      {
        ...points,
        data: values,
        pointBackgroundColor: pointsColor(ucl, lcl, values)
      },
      { ...middle, data: repeat(center, size) },
      { ...limits, data: repeat(ucl, size) },
      { ...limits, data: repeat(lcl, size) }
    ]
  }
}

export const xbar_sbar = data => {
  const sampleSize = data[0].length
  const size = data.length

  let values = []
  let S = []

  for (const arr of data) {
    S.push(standardDeviation(arr, 1))
    values.push(avg(arr))
  }

  const sbar = avg(S)
  const center = avg(values)

  const lcl = center - A3[sampleSize] * sbar
  const ucl = center + A3[sampleSize] * sbar

  return {
    title: "XBAR Sbar",
    ticks: {
      ucl,
      center,
      lcl
    },
    datasets: [
      {
        ...points,
        data: values,
        pointBackgroundColor: pointsColor(ucl, lcl, values)
      },
      { ...middle, data: repeat(center, size) },
      { ...limits, data: repeat(ucl, size) },
      { ...limits, data: repeat(lcl, size) }
    ]
  }
}

export const rbar = data => {
  const sampleSize = data[0].length
  const size = data.length

  const values = data.map(row => Math.max(...row) - Math.min(...row))

  const center = avg(values)

  const lcl = D3[sampleSize] * center
  const ucl = D4[sampleSize] * center

  return {
    title: "Rbar",
    ticks: {
      ucl,
      center,
      lcl
    },
    datasets: [
      {
        ...points,
        data: values,
        pointBackgroundColor: pointsColor(ucl, lcl, values)
      },
      { ...middle, data: repeat(center, size) },
      { ...limits, data: repeat(ucl, size) },
      { ...limits, data: repeat(lcl, size) }
    ]
  }
}

export const sbar = data => {
  const sampleSize = data[0].length
  const size = data.length

  const values = data.map(row => standardDeviation(row, 1))
  const center = avg(values)

  const lcl = B3[sampleSize] * center
  const ucl = B4[sampleSize] * center

  return {
    title: "Sbar",
    ticks: {
      ucl,
      center,
      lcl
    },
    datasets: [
      {
        ...points,
        data: values,
        pointBackgroundColor: pointsColor(ucl, lcl, values)
      },
      { ...middle, data: repeat(center, size) },
      { ...limits, data: repeat(ucl, size) },
      { ...limits, data: repeat(lcl, size) }
    ]
  }
}

export const ewma = (data, weight = 0.2) => {
  if (Array.isArray(data[0])) {
    data = data.map(row => avg(row))
  }

  const size = data.length
  const center = avg(data)

  let rbar = []
  for (let i = 0; i < size - 1; i++) {
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

  for (let z = 1; z < size + 1; z++) {
    lcl.push(center - 3 * std * Math.sqrt(weight / (2 - weight) * (1 - (1 - weight) ** (2 * z))))
    ucl.push(center + 3 * std * Math.sqrt(weight / (2 - weight) * (1 - (1 - weight) ** (2 * z))))
  }

  return {
    title: "EWMA",
    ticks: {
      ucl: ucl[0],
      center,
      lcl: lcl[0]
    },
    datasets: [
      { ...points, data: values },
      { ...middle, data: repeat(center, size) },
      { ...limits, steppedLine: true, data: ucl },
      { ...limits, fills: "-1", steppedLine: true, data: lcl }
    ]
  }
}

export const cusum = data => {
  if (Array.isArray(data[0])) {
    data = data.map(row => avg(row))
  }

  const size = data.length
  const target = avg(data)

  let rbar = []
  for (let i = 0; i < size - 1; i++) {
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
    cminus.push(Math.min(0, xi - (target - k) + z))
    j = cplus[cplus.length - 1]
    z = cminus[cminus.length - 1]
  }

  const lcl = -4 * std
  const ucl = 4 * std
  const center = 0

  return {
    title: "CUSUM",
    ticks: {
      ucl,
      center,
      lcl
    },
    datasets: [
      {
        ...points,
        data: cplus,
        pointBackgroundColor: pointsColor(ucl, lcl, cplus)
      },
      {
        ...points,
        data: cminus,
        pointBackgroundColor: pointsColor(ucl, lcl, cminus)
      },
      { ...middle, data: repeat(center, size) },
      { ...limits, data: repeat(ucl, size) },
      { ...limits, data: repeat(lcl, size) }
    ]
  }
}
