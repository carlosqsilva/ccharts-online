import React, { Component } from "react"
import Chart from "chart.js"

class ChartComponent extends Component {

  componentDidMount() {
    this.render_chart()
  }

  render_chart(){
    const node = this.element
    this.chart_instance = new Chart(node, {
      responsive: false,
      maintainAspectRatio: false,
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
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

export default ChartComponent;