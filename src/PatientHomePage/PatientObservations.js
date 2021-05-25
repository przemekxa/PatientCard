import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class PatientObservations extends React.Component {


  render() {
    const observations = this.props.observations.map( (observ, index) => 
      (
        <TableRow key={index}>
          <TableCell>{(new Date(observ.date)).toLocaleDateString() + ' ' + (new Date(observ.date)).toLocaleTimeString()}</TableCell>
          <TableCell>{observ.name}</TableCell>
          <TableCell>{observ.value}</TableCell>
        </TableRow>
      )
    )

    return (
      <div>
        <h2>Observations</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align='center'>10-01-2011</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {observations}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

}

export default PatientObservations