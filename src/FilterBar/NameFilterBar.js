import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styles from './styles'

class NameFilterBar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nameFilter: "",
      displayCountFilter: "",
    }
  }

  nameFilterChanged(event) {
    this.setState({nameFilter: event.target.value})
  }

  displayCountFilterChanged(event) {
    let newValue = event.target.value
    if (newValue <= 0 ) { newValue = "" }
    
    if (this.state.displayCountFilter !== newValue) {
      this.setState({displayCountFilter: newValue})
    }
  }


  render() {
    return (
      <div style={styles.container}>
        <TextField 
          id="filterByNameInput" 
          value={this.state.nameFilter} 
          onChange={(e) => this.nameFilterChanged(e)} 
          style={styles.filterInputs}
          label="Filter by name" 
          variant="outlined" 
        />
        <TextField 
          id="displayCountInput" 
          value={this.state.displayCountFilter} 
          onChange={(e) => this.displayCountFilterChanged(e)}
          style={styles.filterInputs}
          type="number" 
          label="Displayed results" 
          variant="outlined" 
        />
        <Button
          variant="outlined" 
          size="large"
          onClick={() => this.props.onFilter(this.state.nameFilter, this.state.displayCountFilter)}
        >FILTER</Button>
        <Button
          variant="outlined" 
          size="large"
          onClick={() => {
            this.setState({nameFilter: '', displayCountFilter: ''})
            this.props.onFilter('', '')
          }}
        >CLEAR</Button>
      </div>
    )
  }
}

export default NameFilterBar