import React from 'react'
import Button from '@material-ui/core/Button'
import PatientInfo from './PatientInfo'
import PatientObservations from './PatientObservations'
import PatientMedicaments from './PatientMedicaments'

class PatientHomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      patient: {},
      observations: [],
      medications: [],
    }
  }
  

  async componentDidMount() {
    const allInfo = await this.props.fhirHandler.getPatient(this.props.id)
    this.setState({
      patient: allInfo.patient,
      observations: allInfo.observations,
      medications: allInfo.medications})
  }

  render() {

    return (
      <div className="mainBox">
        <PatientInfo patient={this.state.patient} />
        <PatientObservations observations={this.state.observations} />
        <PatientMedicaments medications={this.state.medications} />

        <Button
          variant="outlined" 
          onClick={() => this.props.onReturn()}
        >BACK</Button>
      </div>
    )
  }
}

export default PatientHomePage