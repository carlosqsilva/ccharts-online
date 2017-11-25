import React from "react"
import { close, csv } from "../assets"
import { connect } from "react-redux"
import { toggle_modal, loadData, setDelimiter, setHeader} from "../store/actions"

const Modal = (props) => {
  const {
    toggleModal,
    readFile,
    hasHeader,
    modal
  } = props

  if (!modal.closed) {
    return (
      <div className="modal">
        
        <div className="options">
          
          <label className="fileInput">
            <input onChange={readFile} type="file" />
            <img src={csv} alt=""/>
            <span>Choose a file</span>
          </label>

          <div className="comboBox">
            <select onChange={setDelimiter}>
              <option>Delimiter</option>
              <option>Comma</option>
              <option>empty space</option>
              <option>Colon</option>
              <option>Semicolon</option>
            </select>
          </div>

          <div className="comboBox">
            <select onChange={setDelimiter}>
              <option>Decimal</option>
              <option>Option "."</option>
              <option>Option ","</option>
            </select>
          </div>

          <label className="checkBox">
            <input onClick={hasHeader} type="checkbox" />
            Has header
          </label>

          <a onClick={toggleModal} ><img src={close} alt=""/></a>

        </div>
        <div className="dataGrid">
          {modal.data && 
            <table>
              <thead>
                <th>__</th>
                {
                  modal.columns.map((cell, i) => <th key={i}>{cell}</th>)
                }
              </thead>
              <tbody>
                {
                  modal.data.map((row, i) =>
                    <tr key={`tr${i}`}>
                      <th key={i}>{i}</th>
                      {
                        row.map((cell, j) => <td key={j}>{cell}</td>)
                      }
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
    modal: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(toggle_modal()),
    readFile: (e) => dispatch(loadData(e)),
    hasHeader: (e) => dispatch(setHeader(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);