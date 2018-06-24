export const repeat = (value, size) => Array(size).fill(value)

export const pointsColor = (ucl, lcl, values) =>
  values.map((val, i) => (val > ucl || val < lcl ? "#f54d42" : "#259f6c"))

export const avg = (arr, ddof = 0) =>
  arr.reduce((a, b) => a + b) / (arr.length - ddof)

export const variance = (arr, ddof = 0) => {
  return avg(arr.map(x => Math.pow(x - avg(arr), 2)), ddof)
}

export const standardDeviation = (arr, ddof = 0) =>
  Math.sqrt(variance(arr, ddof))

export const splitArray = arr => {
  const length = arr.length
  let s = new Array(length)
  let d = new Array(length)

  let i = 0
  while (i < length) {
    s[i] = arr[i][0]
    d[i] = arr[i][1]
    i++
  }

  return [s, d]
}
