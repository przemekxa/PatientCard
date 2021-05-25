import React /*, { useState, useEffect }*/ from 'react'
import FilterBar from './FilterBar/FilterBar'
import { CircularProgress } from '@material-ui/core'

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
      patientsList = this.state.patients.map(p => 
        <p key={p.id} onClick={() => this.props.onClick(p.id)} style={{cursor: 'pointer'}}>{p.name}</p>
      )
    }
    return (
      <div className="mainBox">
        
        <FilterBar
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