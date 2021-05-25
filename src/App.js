import React from 'react'
import PatientListPage from './PatientListPage/PatientListPage'
import PatientHomePage from './PatientHomePage/PatientHomePage'
import fhirHandler from './service/fhirHandler'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedPatientID: null,
      fhirHandler: new fhirHandler()
    }

  }


  selectPatient(id) {
    this.setState({selectedPatientID: id})
  }


  render() {
    let main;
    if(this.state.selectedPatientID) {
      main = <PatientHomePage
        id={this.state.selectedPatientID}
        fhirHandler={this.state.fhirHandler}
        onReturn={() => this.setState({selectedPatientID: null})} />
    } else {
      main = <PatientListPage
        fhirHandler={this.state.fhirHandler}
        onClick={(id) => this.selectPatient(id)} />
    }

    // 1711883
    // 

    return (
      <div>
        <button onClick={() => this.selectPatient("1438442")}>EXAMPLE</button>
        {main}
      </div>
    )
  }
}

export default App;
