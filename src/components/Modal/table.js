import React from "react"

export const DataTable = ({ columns, data }) => {
  if (data) {
    return (
      <table className="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>{columns.map((cell, i) => <th key={i}>{cell}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <th key={i}>{i}</th>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return null
}
