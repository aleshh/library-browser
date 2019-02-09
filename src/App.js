import React, { Component } from 'react'
import Entry from './components/Entry'
import Search from './components/Search'
import { retrieveDdc, searchDdc } from './helpers/ddcFunctions'

class App extends Component {
  state = {
    searchTerm: '',
    currentLocation: '',
    currentView: []
  }

  handleSearch = e => {
    const searchTerm = e.target.value
    if (searchTerm === '') {
      this.componentWillMount()
      return
    }
    const results = searchDdc(searchTerm)
    this.setState({
      searchTerm: searchTerm,
      currentLocation: '',
      currentView: results ? results : []
    })
  }

  handleClick = input => {
    // if it's a number...
    if (/^\d{3}$|^\d{2}x$|^\dxx$|^x{3}$/.test(input)) {
      const results = retrieveDdc(input)
      this.setState({
        searchTerm: '',
        currentLocation: input,
        currentView: results ? results : []
      })
    } else {
      const results = searchDdc(input)
      this.setState({
        searchTerm: input,
        currentLocation: '',
        currentView: results ? results : []
      })
    }
  }

  componentWillMount () {
    const results = retrieveDdc('xxx')
    this.setState({
      searchTerm: '',
      currentView: results ? results : []
    })
  }

  render () {
    return (
      <div className='App'>
        <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} />
        <div className='results'>
          { this.state.currentView.map((result, i) => {
            const entryId = result[result.length - 1].id
            return (
              <Entry
                key={entryId}
                entry={result}
                currentLocation={this.state.currentLocation}
                showHome={(i === 0 && entryId !== '0xx' )}
                handleClick={this.handleClick}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
