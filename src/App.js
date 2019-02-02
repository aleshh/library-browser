import React, { Component } from 'react'
import ddc from './data/ddcIndex.json'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: 'book'
    }
  }

  searchDdc (searchTerm) {
    ddc.forEach(entry => {
      if (entry.description.includes(searchTerm)) {
        console.log(entry.number + ' ' + entry.description)
      }
    })
  }

  render () {
    this.searchDdc(this.state.searchTerm)

    return (
      <div className='App'>
        {ddc[0].number + ' ' + ddc[0].description}
      </div>
    )
  }
}

export default App
