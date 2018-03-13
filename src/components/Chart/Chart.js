import { h, Component } from "preact"
import { connect } from "react-redux"
import Chart from "chart.js"
import { toggle_modal, plot_Chart } from "../../store/actions"
import { alarm } from "../../assets"
import { Button, Select } from "../Inputs"
import { options, description } from "./options"

class ChartComponent extends Component {
  componentDidMount() {
    this.render_chart()
  }

  componentWillUnmount() {
    this.chart_instance.destroy()
  }

  componentDidUpdate() {
    this.chart_instance.destroy()
    this.render_chart()
    this.container.scrollIntoView()
  }

  shouldComponentUpdate(nextProps) {
    const { labels, datasets } = this.props.plot

    if (
      labels !== nextProps.plot.labels ||
      datasets !== nextProps.plot.datasets ||
      nextProps.plot.displayAlarm
    ) {
      return true
    }
    return false
  }

  render_chart() {
    const node = this.element
    const { plot } = this.props

    this.chart_instance = new Chart(node, {
      ...options(plot)
    })
  }

  downloadChart = ({ target }) => {
    target.href = this.element.toDataURL()
    target.download = "Chart.png"
  }

  render() {
    const { displayInfo, displayAlarm, title } = this.props.plot
    const { toggleModal, plotChart } = this.props
    const options = [
      "Charts",
      "Xbar_Rbar",
      "Xbar_Sbar",
      "Rbar",
      "Sbar",
      "Ewma",
      "Cusum"
    ]
    return (
      <section className="section" ref={e => (this.container = e)}>
        <div className="container">
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <Button handleClick={toggleModal}>Import Data</Button>
              </div>
              <div className="level-item">
                <Select options={options} handleChange={plotChart} />
              </div>

              {displayInfo && (
                <a className="button" onClick={this.downloadChart}>
                  Download
                </a>
              )}

              {displayAlarm && (
                <div className="alarm">
                  <img src={alarm} alt="Alarm" /> You firts need to import a
                  dataset.
                </div>
              )}
            </div>
          </div>

          <canvas className="canvas" ref={e => (this.element = e)} />

          {displayInfo && (
            <div className="information">{description[title]}</div>
          )}
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
