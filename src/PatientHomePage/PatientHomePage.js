import React from 'react'
import Button from '@material-ui/core/Button'
import { CircularProgress } from '@material-ui/core'
import PatientInfo from './PatientInfo'
import PatientDay from './PatientDay'
import DateFilterBar from '../FilterBar/DateFilterBar'
import WeightChart from './WeightChart'

class PatientHomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      patient: {},
      days: [],
      filteredDays: [],
      weightsLabels: [],
      weightsData: []
    }
  }
  

  async componentDidMount() {
    const allInfo = await this.props.fhirHandler.getPatient(this.props.id)

    this.setState({
      isLoading: false,
      patient: allInfo.patient,
      days: allInfo.days,
      filteredDays: allInfo.days
    })

    this.filterWeights(allInfo.days)

  }

  filterWeights(days) {
    let weightsLabels = []
    let weightsData = []

    for (const [_, events] of Object.entries(days)) {
      events
        .filter(e => e.name === 'Body Weight')
        .forEach(w => {
          const date = new Date(w.date)
          weightsLabels.push(date.toLocaleDateString())
          weightsData.push(w.rawValue)
        })
    }
    weightsLabels.reverse()
    weightsData.reverse()

    this.setState({
      weightsLabels: weightsLabels,
      weightsData: weightsData
    })
  }

  filterByDate(from, to) {

    let filtered = {}
    for (const [day, events] of Object.entries(this.state.days)) {
      let date = new Date(Date.parse(day))
      if(date >= from && date <= to) {
        filtered[day] = events
      }
    }
    this.setState({
      filteredDays: filtered
    })

    this.filterWeights(filtered)
  }

  render() {

    let days = []

    for (const [day, events] of Object.entries(this.state.filteredDays)) {
      days.push(<PatientDay key={day} day={day} events={events} />)
    }

    let contents
    if(this.state.isLoading) {
      contents = <CircularProgress style={{display: 'block', margin: '16px auto' }}/>
    } else {
      contents = <div>
        <PatientInfo patient={this.state.patient} />
        <DateFilterBar onFilter={(from, to) => this.filterByDate(from, to)}/>
        <WeightChart weightsLabels={this.state.weightsLabels} weightsData={this.state.weightsData} />
        <h2>History</h2>
        {days}
      </div>
    }

    return (
      <div className="mainBox">
        <Button
          variant="outlined" 
          onClick={() => this.props.onReturn()}
        >BACK</Button>
      {contents}  
      </div>
    )
  }
}

export default PatientHomePage