export const repeat = (value, size) => Array(size).fill(value)

export const pointsColor = (ucl, lcl, values) =>
  values.map((val, i) => (val > ucl || val < lcl ? "#f54d42" : "#259f6c"))

export const sumArray = arr => arr.reduce((a, b) => a + b)

export const avg = (arr, ddof = 0) => sumArray(arr) / (arr.length - ddof)

export const variance = (arr, ddof = 0) => {
  return avg(arr.map(x => Math.pow(x - avg(arr), 2)), ddof)
}

export const standardDeviation = (arr, ddof = 0) =>
  Math.sqrt(variance(arr, ddof))

export const zeros = (row, col) => {
  let arr = new Array(row)
  for (let i = 0; i < row; i++) {
    arr[i] = Array(col).fill(0)
  }
  return arr
}

export const divArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) throw new Error("Array size doesn't match")
  return arr1.reduce((acc, value, i) => {
    acc.push(value / arr2[i])
    return acc
  }, [])
}

export const splitArray = arr => {
  const length = arr.length
  let s = new Array(length)
  let d = new Array(length)

  for (let i = 0; i < length; i++) {
    s[i] = arr[i][0]
    d[i] = arr[i][1]
  }

  return [s, d]
}
