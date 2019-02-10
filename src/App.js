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

  search = searchTerm => {
    const results = searchDdc(searchTerm)
    this.setState({
      searchTerm: searchTerm,
      currentLocation: '',
      currentView: results ? results : []
    })
  }

  retrieve = location => {
    const results = retrieveDdc(location)
    this.setState({
      searchTerm: '',
      currentLocation: location,
      currentView: results ? results : []
    })
  }

  handleSearch = e => {
    const searchTerm = e.target.value
    if (searchTerm === '') {
      this.componentWillMount()
      return
    }
    if (searchTerm.length > 2) {
      this.search(searchTerm)
    } else {
      this.setState({
        searchTerm: searchTerm,
      })
    }
  }

  handleClick = input => {
    if (this.validNUmber(input)) {
      this.retrieve(input)
    } else {
      this.search(input)
    }
  }

  validNumber = number => (/^\d{3}$|^\d{2}x$|^\dxx$|^x{3}$/.test(number))

  componentWillMount () {
    this.retrieve('xxx')
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
