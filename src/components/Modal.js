import React from "react"
import { close, csv } from "../assets"
import { connect } from "react-redux"
import { toggle_modal, loadData } from "../store/actions"

const Modal = (props) => {
  const {
    toggleModal,
    readFile,
    modal
  } = props

  if (!modal.closed) {
    return (
      <div className="modal">
        
        <div className="options">
          
          <label className="fileInput">
            <input onChange={readFile} type="file" />
            <img src={csv} alt=""/>
            <span>Choose a file...</span>
          </label>

          <div className="comboBox">
            <select>
              <option>Select a Delimiter</option>
              <option>Option 1</option>
              <option>Option 1</option>
              <option>Option 1</option>
              <option>Option 1</option>
            </select>
          </div>

          <label className="checkBox">
            <input type="checkbox" />
            Ignore first row
          </label>

          <a onClick={toggleModal} ><img src={close} alt=""/></a>

        </div>
        <div className="dataGrid">
          {modal.data && 
            <table>
              <tbody>
                {
                  modal.data.map((row, index) =>
                    <tr>
                      <th>{index}</th>
                      {row.map(cell => <td>{cell}</td>)}
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
    readFile: (e) => dispatch(loadData(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);