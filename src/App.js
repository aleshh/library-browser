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
    window.location = '#' + searchTerm
  }

  retrieve = location => {
    const results = retrieveDdc(location)
    this.setState({
      searchTerm: '',
      currentLocation: location,
      currentView: results ? results : []
    })
    if (location !== 'xxx') {
      window.location = '#' + location
    } else {
      window.location = '#'
    }
  }

  handleSearch = e => {
    const searchTerm = e.target.value
    if (searchTerm === '') {
      this.retrieve('xxx')
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

  handleInput = input => {
    if (this.validNumber(input)) {
      this.retrieve(input)
    } else {
      this.search(input)
    }
  }

  validNumber = number => (/^\d{3}$|^\d{2}x$|^\dxx$|^x{3}$/.test(number))

  componentWillMount () {
    const uriLocation = window.location.hash.slice(1)
    console.log(window.location.pathname)

    if (uriLocation.length === 0) {
      this.retrieve('xxx')
      return
    }

    this.handleInput(uriLocation)
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
                handleClick={this.handleInput}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default App
