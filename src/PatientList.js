import React, { useState, useEffect } from 'react'

class PatientList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      patients: []
    }
  }
  
    
  componentDidMount() {
    fetch('http://hapi.fhir.org/baseR4/Patient?given=Kevin&_pretty=true')
      .then(data => data.json())
      .then(json => {
        const patients = json.entry.map(e => e.resource)
        this.setState({ patients: patients })
        console.log(patients)
      })
  }

    render() {
      let patientsHtml = this.state.patients.map(p => 
        <p onClick={() => this.props.onClick(p.id)}>{JSON.stringify(p)}</p>
      )
      return (
        <div>
          <p>tekst z App</p>
          <p></p>
          <p>{null}</p>
          {patientsHtml}
        </div>
      );
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

export default PatientList;