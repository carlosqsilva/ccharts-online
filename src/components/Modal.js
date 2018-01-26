import React from "react"
import { close } from "../assets"
import { connect } from "react-redux"
import {
  toggle_modal,
  loadData,
  set_Delimiter,
  set_Decimal,
  set_Header
} from "../store/actions"
import { Select } from "./Inputs/select"
import { CheckBox } from "./Inputs/checkBox"
import { FileInput } from "./Inputs/fileInput"

const Modal = props => {
  const {
    toggleModal,
    readFile,
    setHeader,
    setDelimiter,
    setDecimal,
    modal
  } = props

  if (!modal.closed) {
    return (
      <div className="modal">
        <div className="options">
          <FileInput handleChange={readFile}>Choose a file</FileInput>

          <Select
            options={[
              "Delimiter",
              "Comma",
              "empty space",
              "Colon",
              "Semicolon"
            ]}
            handleChange={setDelimiter}
          />

          <Select
            options={["Decimal", 'Option "."', 'Option ","']}
            handleChange={setDecimal}
          />

          <CheckBox handleClick={setHeader}>Has header</CheckBox>

          <a className="closeBtn" onClick={toggleModal}>
            <span>Close</span>
            <img src={close} alt="x" />
          </a>
        </div>

        <div className="dataGrid">
          {modal.data && (
            <table>
              <thead>
                <tr>
                  {modal.columns.map((cell, i) => <th key={i}>{cell}</th>)}
                </tr>
              </thead>
              <tbody>
                {modal.data.map((row, i) => (
                  <tr key={i}>
                    <th key={i}>{i}</th>
                    {row.map((cell, j) => <td key={j}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }
  return null
}

const mapStateToProps = state => {
  return {
    modal: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(toggle_modal()),
    readFile: e => dispatch(loadData(e)),
    setHeader: e => dispatch(set_Header(e)),
    setDelimiter: e => dispatch(set_Delimiter(e)),
    setDecimal: e => dispatch(set_Decimal(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
