import React from 'react'
import PatientList from './PatientList'
import PatientHomePage from './PatientHomePage'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedPatientID: null,
    }

  }


  selectPatient(id) {
    this.setState({selectedPatientID: id})
  }


  render() {
    let main = this.state.selectedPatientID ? <PatientHomePage onReturn={() => this.setState({selectedPatientID: null})} /> : <PatientList onClick={(id) => this.selectPatient(id)}  />

    return (
      <div>
        {main}
      </div>
    )
  }
}

export default App;
