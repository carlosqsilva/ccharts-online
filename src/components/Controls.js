import React from "react"
import { connect } from "react-redux"
import { toggle_modal, plot_Chart } from "../store/actions"

const Controls = (props) => {
  const {
    toggleModal,
    plotChart
  } = props

  return (
    <div className="controls">

      <a className="button" onClick={toggleModal}>Import Data</a>

      <div className="comboBox">
        <select onChange={plotChart}>
          <option>Charts</option>
          <option>Xbar_Rbar</option>
          <option>Xbar_Sbar</option>
          <option>Rbar</option>
          <option>Sbar</option>
          <option>Ewma</option>
          <option>Cusum</option>
        </select>
      </div>

      <a className="button" >Download</a>

    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(toggle_modal()),
    plotChart: (e) => dispatch(plot_Chart(e))
  }
}

export default connect(null, mapDispatchToProps)(Controls)