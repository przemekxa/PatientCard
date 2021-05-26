import React from 'react'
import Button from '@material-ui/core/Button'
import PatientInfo from './PatientInfo'
import PatientObservations from './PatientObservations'
import PatientMedicaments from './PatientMedicaments'
import PatientDay from './PatientDay'

class PatientHomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      patient: {},
      observations: [],
      medications: [],
      days: []
    }
  }
  

  async componentDidMount() {
    const allInfo = await this.props.fhirHandler.getPatient(this.props.id)
    this.setState({
      patient: allInfo.patient,
      observations: allInfo.observations,
      medications: allInfo.medications,
      days: allInfo.days})
  }

  render() {

    let days = []

    for (const [day, events] of Object.entries(this.state.days)) {
      days.push(<PatientDay key={day} day={day} events={events} />)
    }

    console.log("DAYS", days)

    return (
      <div className="mainBox">
        <PatientInfo patient={this.state.patient} />
        <h2>History</h2>
        {days}
        {/* <PatientObservations observations={this.state.observations} />
        <PatientMedicaments medications={this.state.medications} /> */}

        <Button
          variant="outlined" 
          onClick={() => this.props.onReturn()}
          style={{marginTop: '16px'}}
        >BACK</Button>
      </div>
    )
  }
}

export default PatientHomePage