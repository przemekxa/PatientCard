import React from 'react'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import styles from './styles'

export default function DateFilterBar(props) {
  const [fromDate, setFromDate] = React.useState(new Date('1901-01-01'))
  const [toDate, setToDate] = React.useState(new Date())

  const handleFromDateChange = (date) => setFromDate(date)
  const handleToDateChange = (date) => setToDate(date)

  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={styles.container}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="fromDatePicker"
          label="From"
          value={fromDate}
          onChange={handleFromDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="toDatePicker"
          label="To"
          value={toDate}
          onChange={handleToDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <Button
          variant="outlined" 
          size="large"
          onClick={() => props.onFilter(fromDate, toDate)}
        >FILTER BY DATE</Button>
      </div>
    </MuiPickersUtilsProvider>
  )
}