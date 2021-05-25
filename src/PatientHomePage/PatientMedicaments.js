import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class PatientMedicaments extends React.Component {


  render() {
    const medicaments = this.props.medications.map( (med, index) => 
      (
        <TableRow key={index}>
          <TableCell>{(new Date(med.date)).toLocaleDateString() + ' ' + (new Date(med.date)).toLocaleTimeString()}</TableCell>
          <TableCell>{med.value}</TableCell>
        </TableRow>
      )
    )

    return (
      <div>
        <h2>Medicaments</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Medicament</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {medicaments}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

}

export default PatientMedicaments