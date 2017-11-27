import React, { Component } from "react"
import { connect } from "react-redux"
import Chart from "chart.js"

class ChartComponent extends Component {

  // constructor(props) {
  //   super(props)
  // }

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
    const { labels, datasets} = this.props.modal
    
    if (labels !== nextProps.modal.labels || datasets !== nextProps.modal.datasets) {
      return true
    }
  }

  render_chart(){
    const node = this.element
    const { labels, datasets, title} = this.props.modal
    
    this.chart_instance = new Chart(node, {
      responsive: false,
      maintainAspectRatio: false,
      type: "line",
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: title
        },
        // scales: {
        //   yAxes: [{
        //       ticks: {
        //         autoSkip: false,
        //           // maxTicksLimit: 4
        //       }
        //   }]
        // },
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
          responsiveAnimationDuration: 0,
      },
    })
  }

  render(){

    return (
      <div className="chart" ref={parent => this.parent = parent}> 
        <canvas
          ref={element => this.element = element}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state
  }
}

export default connect(mapStateToProps)(ChartComponent);