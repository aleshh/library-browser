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
        if (entry.description.toLowerCase().includes(searchTermLc)) {
          results.push([entry])
        }
        if (entry.subordinates != null) {
          let subordinates = this.searchDdc(entry.subordinates, searchTerm)
          if (subordinates) {
            subordinates.forEach(result => {
              result.unshift(entry)
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
    this.setState({
      searchResults: results ? results : []
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='search'>
        <label htmlFor="search">Search: </label>
          <input autoFocus type='text' name='search' onKeyUp={this.handleSearch} />
        </div>
        <div className='results'>
    { this.state.searchResults.map(result => <Entry key={result[result.length - 1].id} entry={result} />)}
        </div>
      </div>
    )
  }
}

const Entry = ({entry}) => {
  const item = entry[entry.length - 1]
  const path = entry.slice(0, -1)
  return (
    <div className='result-row' key={item.id}>
      <p className='result-path'>{path.map(item => (item.number + ' ' + item.description + ' > '))}</p>
      <p className='result'>{item.number} {item.description}</p>
    </div>
  )
}

export default App
