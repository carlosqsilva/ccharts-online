import { h, Component } from "preact"
import { connect } from "react-redux"
import Chart from "chart.js"
import { toggle_modal, plot_Chart } from "../../store/actions"
import { alarm } from "../../assets"
import { Button, Select } from "../Inputs"
import { options, description } from "./options"

class ChartComponent extends Component {
  options = [
    "Charts",
    "Xbar_Rbar",
    "Xbar_Sbar",
    "Rbar",
    "Sbar",
    "Ewma",
    "Cusum"
  ]

  componentDidMount() {
    this.render_chart()
  }

  componentDidUpdate() {
    this.chart_instance.destroy()
    this.render_chart()
  }

  render_chart() {
    const { plot } = this.props
    this.chart_instance = new Chart(this.chart, {
      ...options(plot)
    })
  }

  downloadChart = ({ target }) => {
    target.href = this.chart.toDataURL()
    target.download = "Chart.png"
  }

  render({ toggleModal, plotChart, plot }) {
    const { displayChart, displayAlarm, title } = plot
    return (
      <section class="section">
        <div class="container">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <Button handleClick={toggleModal}>Import Data</Button>
              </div>
              <div class="level-item">
                <Select options={this.options} handleChange={plotChart} />
              </div>

              {displayChart && (
                <a class="button" onClick={this.downloadChart}>
                  Download
                </a>
              )}

              {displayAlarm && (
                <div class="alarm">
                  <img src={alarm} alt="Alarm" /> You firts need to import a
                  dataset.
                </div>
              )}
            </div>
          </div>

          <canvas class="canvas" ref={e => (this.chart = e)} />

          {displayChart && <div class="information">{description[title]}</div>}
        </div>
      </section>
    )
  }
}

const state = state => ({
  plot: state.plot
})

const actions = {
  toggleModal: toggle_modal,
  plotChart: plot_Chart
}

export default connect(state, actions)(ChartComponent)
