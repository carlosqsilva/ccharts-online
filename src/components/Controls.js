import React from "react"
import { connect } from "react-redux"
import { toggle_modal } from "../store/actions"

const Controls = (props) => {
  const {
    toggleModal,
  } = props

  return (
    <div className="controls">
      <button onClick={toggleModal}>Import Data</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(toggle_modal())
  }
}

export default connect(null, mapDispatchToProps)(Controls)