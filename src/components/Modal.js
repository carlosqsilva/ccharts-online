import React from "react"
import { close, csv } from "../assets"
import { connect } from "react-redux"
import { toggle_modal } from "../store/actions"

const Modal = (props) => {
  const {
    toggleModal,
    modal
  } = props

  if (!modal.closed) {
    return (
      <div className="modal">
        
        <div className="options">
          
          <label className="fileInput">
            <input type="file" />
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

          <a onClick={toggleModal} ><img src={close} alt=""/></a>

        </div>

        <textarea className="textInput"
          wrap="off" cols="20" rows="20"></textarea>
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
    toggleModal: () => dispatch(toggle_modal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);