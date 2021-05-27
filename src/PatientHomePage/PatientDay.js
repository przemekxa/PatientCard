import React from 'react'
import { Paper, Collapse, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';

class PatientDay extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      expanded: false
    }
  }
  
  render() {
  
    const paperStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      justifyItems: 'start',
      alignItems: 'center',
      padding: '8px 16px',
      margin: '8px 0'
    }

    let events = this.props.events.map( (event, index) => 
      <TableRow key={index}>
        <TableCell>{(new Date(event.date)).toLocaleTimeString()}</TableCell>
        <TableCell>{event.type}</TableCell>
        <TableCell>{event.name}</TableCell>
        <TableCell>{event.value ?? '-'}</TableCell>
      </TableRow>
    )

    let day = (new Date(this.props.day)).toLocaleDateString()
    
    return (
      <Paper style={paperStyle} elevation={2}>
        <h3>{day}</h3>
        <Button
          variant='contained'
          onClick={() => this.setState({expanded: !this.state.expanded})}>
          {this.state.expanded ? 'Hide' : 'Show'}
        </Button>
        
        <Collapse in={this.state.expanded} style={{gridColumn: '1 / 3', width: '100%'}}>
          <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hour</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events}
                </TableBody>
              </Table>
            </TableContainer>
        </Collapse>
      </Paper>
      )
    }
  
  }
  
  export default PatientDay