import React /*, { useState, useEffect }*/ from 'react'
import FilterBar from './FilterBar/FilterBar'
import fhirHandler from '../service/fhirHandler'

class PatientListPage extends React.Component {
  constructor(props) {
    super(props)

    this.fhirHandler = new fhirHandler()

    this.state = {
      patients: []
    }
  }
  
    
  componentDidMount() {
    this.updatePatientList("", "")
  }


    render() {
      let patientsHtml = this.state.patients.map(p => 
        <p key={p.id} onClick={() => this.props.onClick(p.id)}>{JSON.stringify(p)}</p>
      )
      return (
        <div className="mainBox">
          
          <FilterBar onFilter={(nameFilter, displayCountFilter) => this.updatePatientList(nameFilter, displayCountFilter)} />
          
          {patientsHtml}
        
        </div>
      );
    }

    async updatePatientList(nameFilter, displayCountFilter) {
      const patients = await this.fhirHandler.getPatientList(nameFilter, displayCountFilter)
      console.log(patients)
      this.setState({patients: patients})
    }

}


// function PatientListFunction() {

//     const [patients, setPatients] = useState([])

//     const setPatientsCheck = (newState) => {
//         if(true) {
//             setPatients(newState)
//         }
//     };

//     useEffect(() => {
//         // Did mount
        
//         return () => {
//             // Did unmount
//         }
//     });
    
//     return (
//         <div></div>
//     )
// }

export default PatientListPage;