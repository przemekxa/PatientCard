import React from 'react'
import NameFilterBar from '../FilterBar/NameFilterBar'
import { CircularProgress } from '@material-ui/core'
import PatientList from './PatientList'

class PatientListPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      patients: []
    }
  }
    
  componentDidMount() {
    this.updatePatientList("", "")
  }

  render() {
    let patientsList;
    if(this.state.isLoading) {
      patientsList = <CircularProgress style={{margin: '16px auto', display: 'block'}} />
    } else {
      patientsList = <PatientList items={this.state.patients} onClick={(id) => this.props.onClick(id)}/>
    }
    return (
      <div className="mainBox">

        <h1 style={{margin: '0 0 32px 0'}}>Search for a patient</h1>
        
        <NameFilterBar
          onFilter={(nameFilter, displayCountFilter) => this.updatePatientList(nameFilter, displayCountFilter)}
          />
        
        {patientsList}
        
        
      
      </div>
    );
  }

  async updatePatientList(nameFilter, displayCountFilter) {
    this.setState({isLoading: true})
    const patients = await this.props.fhirHandler.getPatientList(nameFilter, displayCountFilter)
    this.setState({isLoading: false, patients: patients})
  }

}

export default PatientListPage;