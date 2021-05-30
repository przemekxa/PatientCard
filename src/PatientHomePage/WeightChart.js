import { Chart, registerables } from 'chart.js'
import React from 'react'

Chart.register(...registerables);

class WeightChart extends React.Component {

  constructor(props) {
    super(props)
    
    this.chartRef = React.createRef()    
  }


  componentDidMount() {

    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        labels: this.props.weightsLabels,
        datasets: [
          {
            label: "weight",
            data: this.props.weightsData,
          }
        ]
      }
    })  
  }

  componentDidUpdate() { 
    //this.myChart.data = [{x:1, y:1},{x:2, y:2},{x:3, y:3},{x:4, y:4},]
    this.myChart.data = {
      labels: this.props.weightsLabels,
      datasets: [
        {
          label: "weight",
          data: this.props.weightsData,
        }
      ]
    }
    this.myChart.update()
  }


  render() {
    return (
      <div>
        <h2>Body weight</h2>
          <canvas id="myChart" ref={this.chartRef} />
      </div>
    )
  }
}

export default WeightChart