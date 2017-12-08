import React from "react"
import { close, csv } from "../assets"
import { connect } from "react-redux"
import { toggle_modal, loadData, set_Delimiter, set_Decimal, set_Header} from "../store/actions"

const Modal = (props) => {
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
          
          <label className="fileInput marginRight">
            <input onChange={readFile} type="file" accept=".csv,.txt"/>
            <img src={csv} alt=""/>
            <span>Choose a file</span>
          </label>

          <div className="comboBox marginRight">
            <select onChange={setDelimiter}>
              <option>Delimiter</option>
              <option>Comma</option>
              <option>empty space</option>
              <option>Colon</option>
              <option>Semicolon</option>
            </select>
          </div>

          <div className="comboBox marginRight">
            <select onChange={setDecimal}>
              <option>Decimal</option>
              <option>Option "."</option>
              <option>Option ","</option>
            </select>
          </div>

          <label className="checkBox marginRight">
            <input onClick={setHeader} type="checkbox" />
            Has header
          </label>

          <a className="closeBtn" onClick={toggleModal} >
            <span>Close</span>
            <img src={close} alt="x"/>
          </a>

        </div>

        <div className="dataGrid">
          {modal.data && 
            <table>
              <thead>
                <tr>
                  { modal.columns.map((cell, i) => <th key={i}>{cell}</th>) }
                </tr>
              </thead>
              <tbody>
                {
                  modal.data.map((row, i) =>
                    <tr key={i}>
                      <th key={i}>{i}</th>
                      { row.map((cell, j) => <td key={j}>{cell}</td>) }
                    </tr>)
                }
              </tbody>    
            </table>
          }
        </div>

      </div>
    )  
  }
  return null  
}

const mapStateToProps = (state) => {
  return {
    modal: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(toggle_modal()),
    readFile: (e) => dispatch(loadData(e)),
    setHeader: (e) => dispatch(set_Header(e)),
    setDelimiter: (e) => dispatch(set_Delimiter(e)),
    setDecimal: (e) => dispatch(set_Decimal(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);