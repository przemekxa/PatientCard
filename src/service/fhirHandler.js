
class FhirHandler {

  url = 'http://hapi.fhir.org/baseR4/'

  patientName(patient) {
    return [
      patient.name[0].prefix ?? '',
      (patient.name[0].given ?? []).join(),
      patient.name[0].family ?? '',
      patient.name[0].suffix ?? ''
    ]
    .filter(element => element)
    .join(' ')
  }

  async getPatientList(nameFilter, count) {
    let patients = await fetch(`${this.url}Patient?_count=${count}&given=${nameFilter}`)
    patients = await patients.json()
    patients = patients.entry.map(e => e.resource)

    return patients
      .map(p => {
        return {
          id: p.id,
          name: this.patientName(p)
        }
      })
  }

  async getPatient(id) {
    let everything = await fetch(`${this.url}Patient/${id}/$everything`,)
    everything = (await everything.json()).entry.map(e => e.resource)

    // Patient
    let patient = everything.find(e => e.resourceType === 'Patient')
    patient = {
      id: patient.id,
      name: this.patientName(patient),
      birthDate: patient.birthDate,
      genrer: patient.gender,
    }

    // Observations
    let observations = everything.filter(e => e.resourceType === 'Observation')

    console.log("Observations", observations)

    return everything
  }
}

export default FhirHandler