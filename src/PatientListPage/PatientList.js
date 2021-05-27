import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

export default function PatientList(props) {

  const patientsList = props.items.map(p => 
    <ListItem 
      style={{borderRadius: "10px"}}
      button 
      key={p.id} 
      onClick={() => props.onClick(p.id)}
    >
      <ListItemText primary={p.name} secondary={'Birth date: ' + p.birthDate} />
    </ListItem>
  )

  return (
    <div>
      <List component="nav" aria-label="patient list">
        {patientsList}
      </List>
    </div>
  )
}