import React, { Component } from 'react'
import ddc from './data/ddcIndex.json'

class App extends Component {
  state = {
    searchResults: []
  }

  searchDdc = (ddc, searchTerm) => {
    const results = []
    const searchTermLc = searchTerm.toLowerCase()

    if (searchTerm.length > 0) {
      ddc.forEach(entry => {
        const entryToString = entry.number + ' ' + entry.description
        if (entry.description.toLowerCase().includes(searchTermLc)) {
          results.push([entryToString])
        }
        if (entry.subordinates != null) {
          let subordinates = this.searchDdc(entry.subordinates, searchTerm)
          if (subordinates) {
            subordinates.forEach(result => {
              result.unshift(entryToString)
            })
            results.push(...subordinates)
          }
        }
      })
    }
    return (results.length > 0) ? results : null

  }

  handleSearch = e => {
    const results = this.searchDdc(ddc, e.target.value)
    console.log('results:', results)
    // this.setState({
    //   searchResults: results
    // })
  }

  render () {
    console.log(this.searchDdc(ddc, 'book'))
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
