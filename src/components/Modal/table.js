import React from "react"
import styled from "styled-components"

const Table = styled.div`
  grid-area: datagrid;
  background-color: whitesmoke;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  overflow: scroll;
  padding: 3px;

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    tr {
      &:nth-child(even) {
        background-color: #dbdbdb;
      }
    }
    td,
    th {
      text-align: left;
      line-height: 1.6rem;
      border: 1px solid #4e4e4e;
      border-width: 0 0 1px;
    }
  }
`

export const DataTable = props => {
  const { columns, data } = props.modal
  if (data) {
    return (
      <Table>
        <table>
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
      </Table>
    )
  }
  return null
}
