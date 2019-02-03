import React, { Component } from 'react'
import ddc from './data/ddcIndex.json'

class App extends Component {
  state = {
    tmp: 'test',
    searchResults: []
  }

  searchDdc = searchTerm => {
    const results = []
    const searchTermLc = searchTerm.toLowerCase()

    if (searchTerm.length > 0) {
      ddc.forEach(entry => {
        if (entry.description.toLowerCase().includes(searchTermLc)) {
          results.push(entry.number + ' ' + entry.description)
        }
      })
    }
    this.setState({
      searchResults: results
    })
  }

  handleSearch = e => {
    this.searchDdc(e.target.value)
  }

  render () {
    return (
      <div className='App'>
        <input type='text' name='search' onKeyUp={this.handleSearch} />
        <div>
          { this.state.searchResults.map(result => {
            return <div key={result}>{result}</div>
          })}
        </div>
      </div>
    )
  }
}

export default App
