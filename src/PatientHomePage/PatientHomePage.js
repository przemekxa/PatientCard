import React from 'react'
import Button from '@material-ui/core/Button'

class PatientHomePage extends React.Component {


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