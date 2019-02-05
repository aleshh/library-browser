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
        // const entryToString = entry.number + ' ' + entry.description
        // const entryToString = entry.id
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

  componentDidMount () {
    const results = this.searchDdc(ddc, 'book')
    this.setState({
      searchResults: results
    })
  }

  handleSearch = e => {
    const results = this.searchDdc(ddc, e.target.value)
    this.setState({
      searchResults: results ? results : []
    })
  }

  render () {
    console.log(this.state.searchResults)
    return (
      <div className='App'>
        <input type='text' name='search' onKeyUp={this.handleSearch} />
        <div>
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
    <div key={item.id}>
      <br></br>
      {path.map(item => (item.number + ' ' + item.description + ' > '))}
      <h3>{item.number} {item.description}</h3>
    </div>
  )
}

export default App
