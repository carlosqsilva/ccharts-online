import { h, Component } from "preact"
import { connect } from "preact-redux"
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
    "MEWMA",
    "Cusum",
    "P",
    "NP",
    "C",
    "U"
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
    if (!this.props.plot.chart) return null
    target.href = this.chart.toDataURL()
    target.download = "Chart.png"
  }

  render({ toggleModal, plotChart, plot }) {
    const { chart, error, errorMessage, title } = plot
    return (
      <section class="section">
        <div class="container">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <Button action={toggleModal}>Import Data</Button>
              </div>

              <div class="level-item">
                <Select options={this.options} handleChange={plotChart} />
              </div>

              <div class="level-item">
                <Button action={this.downloadChart} disabled={!chart}>
                  Download
                </Button>
              </div>

              {error && (
                <div class="level-item">
                  <img class="icon" src={alarm} alt="Alarm" />
                  <p class="ml10">{errorMessage}</p>
                </div>
              )}
            </div>
          </div>

          <canvas class="canvas" ref={e => (this.chart = e)} />

          {chart && <div class="information">{description[title]}</div>}
        </div>
      </section>
    )
  }
}

const state = ({ plot }) => ({
  plot
})

const actions = {
  toggleModal: toggle_modal,
  plotChart: plot_Chart
}

export default connect(
  state,
  actions
)(ChartComponent)
