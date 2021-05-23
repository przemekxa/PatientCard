import React from 'react'

class PatientHomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Patient

        <p onClick={() => this.props.onReturn()}>Powrót</p>
      </div>
    )
  }
}

export default PatientHomePage