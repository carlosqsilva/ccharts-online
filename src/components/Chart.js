import React, { Component } from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import Chart from "chart.js"
import { toggle_modal, plot_Chart } from "../store/actions"
import { alarm } from "../assets"
import { Select } from "./Inputs/select"
import { Button, ButtonDownload } from "./Inputs/button"

const Wrapper = styled.div`
  grid-area: chart;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;

  > canvas {
    margin-top: 10px;
    background: #f6f6f6;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(black, 0.5);
  }
`

const Controls = styled.div`
  grid-area: controls;
  padding: 0.5rem 0;
  display: flex;
  justify-content: flex-start;
`

const Alarm = styled.div`
  display: inline-flex;
  align-items: center;
  animation: fadetoright 300ms ease;

  > img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`

const Information = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 2fr;
  padding: 30px 0 0 0;
  animation: fadetobottom 600ms ease;

  h1 {
    margin-top: 0;
  }

  > div {
    &:last-child {
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
    }
  }
`

const Description = styled.div`
  a {
    color: black;
    font-weight: 700;
    text-decoration: none;
  }
`

const options = (ticks, title, datasets, labels) => {
  return {
    responsive: false,
    maintainAspectRatio: false,
    type: "line",
    data: {
      labels: labels,
      datasets: datasets
    },
    title: {
      display: true,
      text: title
    },
    options: {
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10
        }
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false
            },
            afterBuildTicks: thisChart => {
              thisChart.ticks = []
              thisChart.ticks.push(ticks.ucl)
              thisChart.ticks.push(ticks.center)
              thisChart.ticks.push(ticks.lcl)
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      },
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0
    }
  }
}

const description = {
  "XBAR Rbar":
    "If the sample size is relatively small (say equal to or less than 10), we can use the range instead of the standard deviation of a sample to construct control charts on X and the range, R. The range of a sample is simply the difference between the largest and smallest observation.",
  "XBAR Sbar":
    "X-s chart is very similar to the  X-R chart. The major difference is that the subgroup standard deviation is plotted when using the  X-s chart, while the subgroup range is plotted when using the  X-R chart. One advantage of using the standard deviation instead of the range is that the standard deviation takes into account all the data, not just the maximum and the minimum. As for the  X-R chart, frequent data and a method of rationally subgrouping the data are required to use the Xbar-s chart.",
  EWMA:
    "The Exponentially Weighted Moving Average (EWMA) is a statistic for monitoring the process that averages the data in a way that gives less and less weight to data as they are further removed in time.",
  CUSUM:
    "CUSUM charts, while not as intuitive and simple to operate as Shewhart charts, have been shown to be more efficient in detecting small shifts in the mean of a process. In particular, analyzing Average Run Length for CUSUM control charts shows that they are better than Shewhart control charts when it is desired to detect shifts in the mean that are 2 sigma or less."
}

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
  }

  shouldComponentUpdate(nextProps) {
    const { labels, datasets } = this.props.plot

    if (labels !== nextProps.plot.labels || datasets !== nextProps.plot.datasets || nextProps.plot.displayAlarm) {
      return true
    }
    return false
  }

  render_chart() {
    const node = this.element
    const { labels, datasets, title, ticks } = this.props.plot

    this.chart_instance = new Chart(node, {
      ...options(ticks, title, datasets, labels)
    })
  }

  downloadChart = e => {
    return this.element.toDataURL()
  }

  render() {
    const { displayInfo, displayAlarm, title, ticks } = this.props.plot
    const { toggleModal, plotChart } = this.props

    return (
      <Wrapper>
        <Controls>
          <Button handleClick={toggleModal}>Import Data</Button>

          <Select
            options={["Charts", "Xbar_Rbar", "Xbar_Sbar", "Rbar", "Sbar", "Ewma", "Cusum"]}
            handleChange={plotChart}
          />

          {displayInfo && <ButtonDownload dataUrl={this.downloadChart}>Download</ButtonDownload>}

          {displayAlarm && (
            <Alarm>
              <img src={alarm} alt="Alarm" /> You firts need to import a dataset.
            </Alarm>
          )}
        </Controls>

        <canvas ref={element => (this.element = element)} />

        {displayInfo ? (
          <Information>
            <div>
              <h1>{title}</h1>
              <div>
                <b>Lower Control Limit: </b> {ticks.ucl.toFixed(4)}
              </div>
              <div>
                <b>Center: </b> {ticks.center.toFixed(4)}
              </div>
              <div>
                <b>Upper Control Limit: </b> {ticks.lcl.toFixed(4)}
              </div>
            </div>

            <div>{description[title]}</div>
          </Information>
        ) : (
          <Description>
            <h2>What is this!?</h2>
            <p>
              The control chart is one of the seven basic tools of quality control. Typically control charts are used
              for time-series data, though they can be used for data that have logical comparability (i.e. you want to
              compare samples that were taken all at the same time, or the performance of different individuals);
              however the type of chart used to do this requires consideration.<a href="https://en.wikipedia.org/wiki/Control_chart">
                - Wikipedia
              </a>
            </p>
          </Description>
        )}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    plot: state.plot
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => dispatch(toggle_modal()),
    plotChart: e => dispatch(plot_Chart(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartComponent)
