import { format, parseISO, compareDesc } from 'date-fns'

class FhirHandler {

  url2 = 'http://hapi.fhir.org/baseR4/'
  url = 'http://localhost:8080/baseR4/'

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
    let names = nameFilter ? `&name=${nameFilter}` : ''
    let patients = await fetch(`${this.url}Patient?_count=${count}${names}`)
    patients = await patients.json()
    if(patients.total === 0) {
      return []
    }
    patients = patients.entry.map(e => e.resource)

    return patients
      .map(p => {
        return {
          id: p.id,
          name: this.patientName(p),
          birthDate: (new Date(p.birthDate)).toLocaleDateString()
        }
      })
  }

  valueToString(observation) {
    if(observation.valueQuantity) {
      let value;
      if(observation.valueQuantity.value % 1 === 0) {
        value = observation.valueQuantity.value.toString()
      } else {
        value = observation.valueQuantity.value.toFixed(2).toString()
      }
      return value + ' ' + observation.valueQuantity.unit
    } else if(observation.valueCodeableConcept) {
      return observation.valueCodeableConcept.text
    } else if(observation.valueString) {
      return observation.valueString
    } else if(observation.valueBoolean) {
      return observation.valueBoolean ? 'True' : 'False'
    } else if(observation.valueInteger) {
      return observation.valueInteger.toString()
    } else if(observation.valueRange) {
      return observation.valueRange.low.toString() + '...' + observation.valueRange.high.toString()
    } else if(observation.valueRatio) {
      return observation.valueRatio.numerator.value.toString() +
        observation.valueRatio.numerator.code +
        ' / ' +
        observation.valueRatio.denominator.value.toString() +
        observation.valueRatio.denominator.code
    } else if(observation.valueSampledData) {
      return observation.valueSampledData.data
    } else if(observation.valueTime) {
      if((typeof observation.valueTime) == 'string') {
        return observation.valueTime
      } else {
        return observation.valueTime.toString()
      }
    } else if(observation.valueDateTime) {
      if((typeof observation.valueDateTime) == 'string') {
        return observation.valueDateTime
      } else {
        return observation.valueDateTime.toString()
      }
    } else if(observation.valuePeriod) {
      if((typeof observation.valuePeriod.start) == 'string') {
        return observation.valuePeriod.start + ' - ' + observation.valuePeriod.end
      } else {
        return observation.valuePeriod.start.toString() + ' - ' + observation.valuePeriod.end.toString()
      }
    }
    return null
  }

  parseEntries(entries) {
    // Patient
    let patientEntry = entries.find(e => e.resourceType === 'Patient')
    let patient
    if(patientEntry) {
      patient = {
        id: patientEntry.id,
        name: this.patientName(patientEntry),
        birthDate: patientEntry.birthDate,
        gender: patientEntry.gender,
      }
    }

    // Observations
    let observations = entries
      .filter(e => e.resourceType === 'Observation')
      .map(o => {
        let rawValue
        let rawUnit
        if(o.valueQuantity) {
          rawValue = o.valueQuantity.value
          rawUnit = o.valueQuantity.unit
        }
        return {
          name: o.code.coding[0].display,
          value: this.valueToString(o),
          date: Date.parse(o.effectiveDateTime),
          type: 'Observation',
          rawValue: rawValue,
          rawUnit: rawUnit
        }
      })
      .filter(o => o.name && o.value)

    // Medications
    let medications = entries
      .filter(e => (e.resourceType === 'MedicationStatement' || e.resourceType === 'MedicationRequest') && e.medicationCodeableConcept)
      .map(m => {
        return {
          name: m.medicationCodeableConcept.coding[0].display,
          date: Date.parse(m.meta.lastUpdated),
          type: 'Medication'
        }
      })
      .filter(s => s)

    let days = observations.concat(medications)
      .sort((lhs, rhs) => lhs.date > rhs.date)
      .reduce((acc, value) => {
        let date = format(new Date(value.date), "yyyy-MM-dd")
        if(acc[date]) {
          acc[date] = acc[date].concat(value)
        } else {
          acc[date] = [value]
        }
        return acc
      }, {})

    return {
      patient: patient,
      days: days
    }
  }

  async getPatient(id) {

    let patient
    let days = {}
    
    let link = `${this.url}Patient/${id}/$everything?_count=1000&start=2008&end=2010-01-01`
    do {
      let everything = await fetch(link)
      everything = (await everything.json())
      console.log('Fetched', everything)

      let entries = everything.entry.map(e => e.resource)
      let parsed = this.parseEntries(entries)

      if(parsed.patient) {
        patient = parsed.patient
      }
      for (const [day, events] of Object.entries(parsed.days)) {
        if(days[day]) {
          days[day] = days[day].concat(events)
        } else {
          days[day] = events
        }
      }

      let next = everything.link.find(r => r.relation === 'next')
      if(next) {
        link = next.url
      } else {
        link = null
      }
    } while(link)

    let orderedDays = Object.keys(days)
      .sort((lhs, rhs) => compareDesc(parseISO(lhs), parseISO(rhs)))
      .reduce((obj, key) => {
        obj[key] = days[key]
        return obj
      }, {})

    return {
      patient: patient,
      days: orderedDays
    }
  }
}

export default FhirHandler