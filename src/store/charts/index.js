import { table } from "./tables"
import { limits, middle, points } from "./config"
import {
  avg,
  pointsColor,
  repeat,
  standardDeviation,
  splitArray
} from "./utils"

const { A2, A3, B3, B4, D3, D4 } = table

const xbar_rbar = async data => {
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

const xbar_sbar = async data => {
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

const rbar = async data => {
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

const sbar = async data => {
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

const ewma = async (data, weight = 0.2) => {
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
    lcl.push(
      center -
        3 *
          std *
          Math.sqrt((weight / (2 - weight)) * (1 - (1 - weight) ** (2 * z)))
    )
    ucl.push(
      center +
        3 *
          std *
          Math.sqrt((weight / (2 - weight)) * (1 - (1 - weight) ** (2 * z)))
    )
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

const cusum = async data => {
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

const p_chart = async arr => {
  if (arr[0].length !== 2) {
    throw new Error("Dataset not suitable for P-Chart.")
  }

  const length = arr.length

  const [sizes, data] = splitArray(arr)

  const p = data.map((value, i) => value / sizes[i])
  const pbar = avg(p)

  if (!sizes.every(n => n * pbar >= 5 && n * (1 - pbar) >= 5)) {
    throw new Error(
      "Dataset doesn't meet this conditions; n * pbar >= 5; n * (1 - pbar) >=5."
    )
  }

  let lcl, ucl, size

  if ((size = avg(sizes)) === sizes[0]) {
    let lower = pbar - 3 * Math.sqrt((pbar * (1 - pbar)) / size)
    let upper = pbar + 3 * Math.sqrt((pbar * (1 - pbar)) / size)
    if (lower < 0) lower = 0
    if (upper > 1) upper = 1
    lcl = repeat(lower, length)
    ucl = repeat(upper, length)
  } else {
    lcl = new Array(length)
    ucl = new Array(length)

    sizes.forEach((size, i) => {
      lcl[i] = pbar - 3 * Math.sqrt((pbar * (1 - pbar)) / size)
      ucl[i] = pbar + 3 * Math.sqrt((pbar * (1 - pbar)) / size)
    })
  }

  return {
    title: "P-Chart",
    ticks: {
      ucl: Array.isArray(ucl) ? ucl[0] : ucl,
      center: pbar,
      lcl: Array.isArray(lcl) ? lcl[0] : lcl
    },
    datasets: [
      { ...points, data: p },
      { ...middle, data: repeat(pbar, length) },
      { ...limits, steppedLine: true, data: ucl },
      { ...limits, fills: "-1", steppedLine: true, data: lcl }
    ]
  }
}

const np_chart = async arr => {
  if (arr[0].length !== 2) {
    throw new Error("Dataset not suitable for NP-Chart.")
  }

  const length = arr.length

  const [sizes, data] = splitArray(arr)

  if (!(avg(sizes) === sizes[0])) {
    throw new Error("The samples must have the same size for this chart")
  }

  const p = avg(data.map(val => val / sizes[0]))
  const pbar = avg(data)

  const lcl = pbar - 3 * Math.sqrt(pbar * (1 - p))
  const ucl = pbar + 3 * Math.sqrt(pbar * (1 - p))

  return {
    title: "NP-Chart",
    ticks: {
      ucl: ucl,
      center: pbar,
      lcl: lcl
    },
    datasets: [
      { ...points, data: data },
      { ...middle, data: repeat(pbar, length) },
      { ...limits, data: repeat(ucl, length) },
      { ...limits, data: repeat(lcl, length) }
    ]
  }
}

const c_chart = async arr => {
  if (arr[0].length !== 2) {
    throw new Error("Dataset not suitable for C-Chart.")
  }

  const length = arr.length

  const [sizes, data] = splitArray(arr)

  if (!(avg(sizes) === sizes[0])) {
    throw new Error("The samples must have the same size for this chart")
  }

  const cbar = avg(data)
  const lcl = cbar - 3 * Math.sqrt(cbar)
  const ucl = cbar + 3 * Math.sqrt(cbar)

  return {
    title: "C-Chart",
    ticks: {
      ucl: ucl,
      center: cbar,
      lcl: lcl
    },
    datasets: [
      { ...points, data: data },
      { ...middle, data: repeat(cbar, length) },
      { ...limits, data: repeat(ucl, length) },
      { ...limits, data: repeat(lcl, length) }
    ]
  }
}

export default {
  Xbar_Rbar: xbar_rbar,
  Xbar_Sbar: xbar_sbar,
  Rbar: rbar,
  Sbar: sbar,
  Ewma: ewma,
  Cusum: cusum,
  P: p_chart,
  NP: np_chart,
  C: c_chart
}
