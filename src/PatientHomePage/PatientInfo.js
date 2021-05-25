import React from 'react'

class PatientInfo extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.patient.name}</h1>
        <p><span style={{opacity: 0.5}}>Born: </span>{(new Date(Date.parse(this.props.patient.birthDate))).toLocaleDateString()}</p>
        <p><span style={{opacity: 0.5}}>Gender: </span>{this.props.patient.gender}</p>
        <p><span style={{opacity: 0.5}}>ID: </span>{this.props.patient.id}</p>
      </div>
    )
  }
}

export default PatientInfo