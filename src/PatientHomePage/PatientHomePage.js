import React from 'react'
import Button from '@material-ui/core/Button'

class PatientHomePage extends React.Component {

  async componentDidMount() {
    const info = await this.props.fhirHandler.getPatient(this.props.id)
    console.log("INFO", info)
  }

  render() {
    return (
      <div className="mainBox">
        <p>Patient</p>

        <Button
          variant="outlined" 
          onClick={() => this.props.onReturn()}
        >BACK</Button>
      </div>
    )
  }
}

export default PatientHomePage