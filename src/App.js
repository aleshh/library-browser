import React, { Component } from 'react'
import ddc from './data/ddcIndex.json'

class App extends Component {
  state = {
    currentView: []
  }

  searchDdc = (searchTerm, index = ddc) => {
    const results = []
    const searchTermLc = searchTerm.toLowerCase()

    if (searchTerm.length > 0) {
      index.forEach(entry => {
        if (entry.description.toLowerCase().includes(searchTermLc) ||
            entry.number.includes(searchTermLc)
          ) {
          results.push([entry])
        }
        if (entry.subordinates != null) {
          let subordinates = this.searchDdc(searchTerm, entry.subordinates)
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
    const results = this.searchDdc(e.target.value)
    this.setState({
      currentView: results ? results : []
    })
  }
  handleClick = e => {
    console.log(e.target)
  }

  componentDidMount () {
    const results = this.searchDdc('book')
    this.setState({
      currentView: results
    })

  }

  render () {
    return (
      <div className='App'>
        <div className='search'>
        <label htmlFor="search">Search: </label>
          <input
            autoFocus
            type='text'
            name='search'
            onKeyUp={this.handleSearch}
          />
        </div>
        <div className='results'>
          { this.state.currentView.map(result => (
            <Entry key={result[result.length - 1].id} entry={result} />
          ))}
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
      <p className='result-path'>
        {path.map(item => (
          <span key={item.id}>{item.number + ' ' + item.description}</span>
        ))}
      </p>
      <p className='result'>{item.number} {item.description}</p>
    </div>
  )
}

export default App
