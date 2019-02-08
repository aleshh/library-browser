import React, { Component } from 'react'
import Entry from './components/Entry'
import Search from './components/Search'
import { retrieveDdc, searchDdc } from './helpers/ddcFunctions'

class App extends Component {
  state = {
    currentLocation: '',
    currentView: []
  }

  handleSearch = e => {
    const results = searchDdc(e.target.value)
    this.setState({
      currentLocation: '',
      currentView: results ? results : []
    })
  }

  handleClick = number => {
    const results = retrieveDdc(number)
    this.setState({
      currentLocation: number,
      currentView: results ? results : []
    })
  }

  componentDidMount () {
    // const results = retrieveDdc("xxx")
    const results = searchDdc('book')
    this.setState({
      currentView: results ? results : []
    })
  }

  render () {
    return (
      <div className='App'>
        <Search handleSearch={this.handleSearch} />
        <div className='results'>
          { this.state.currentView.map((result, i) => {
            const entryId = result[result.length - 1].id
            return (
              <Entry
                key={entryId}
                entry={result}
                currentLocation={this.state.currentLocation}
                showHome={(i === 0 && entryId != '0xx' )}
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
