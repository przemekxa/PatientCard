
class FhirHandler {


  async getPatientList(nameFilter, count) {
    let patients
    await fetch(`http://hapi.fhir.org/baseR4/Patient?_count=${count}&given=${nameFilter}`)
      .then(data => data.json())
      .then(json => {
        patients = json.entry.map(e => e.resource) 
      })
    
      /*
      TODO 

      nice patient object

      */
      return patients
    }
}

export default FhirHandler