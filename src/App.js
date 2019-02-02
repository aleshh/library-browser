import React, { Component } from 'react'
import ddc from './data/ddcIndex.json'

class App extends Component {
  render () {
    console.log(ddc[0])

    return (
      <div className='App'>
        {ddc[0].number + ' ' + ddc[0].description}
      </div>
    )
  }
}

export default App
