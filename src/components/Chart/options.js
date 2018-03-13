export const options = ({ ticks, title, datasets, labels }) => {
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

export const description = {
  "XBAR Rbar":
    "If the sample size is relatively small (say equal to or less than 10), we can use the range instead of the standard deviation of a sample to construct control charts on X and the range, R. The range of a sample is simply the difference between the largest and smallest observation.",
  "XBAR Sbar":
    "X-s chart is very similar to the  X-R chart. The major difference is that the subgroup standard deviation is plotted when using the  X-s chart, while the subgroup range is plotted when using the  X-R chart. One advantage of using the standard deviation instead of the range is that the standard deviation takes into account all the data, not just the maximum and the minimum. As for the  X-R chart, frequent data and a method of rationally subgrouping the data are required to use the Xbar-s chart.",
  EWMA:
    "The Exponentially Weighted Moving Average (EWMA) is a statistic for monitoring the process that averages the data in a way that gives less and less weight to data as they are further removed in time.",
  CUSUM:
    "CUSUM charts, while not as intuitive and simple to operate as Shewhart charts, have been shown to be more efficient in detecting small shifts in the mean of a process. In particular, analyzing Average Run Length for CUSUM control charts shows that they are better than Shewhart control charts when it is desired to detect shifts in the mean that are 2 sigma or less."
}
