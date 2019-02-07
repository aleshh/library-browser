import React, { Component } from 'react'
import Entry from './components/Entry'
import Search from './components/Search'
import { retrieveDdc, searchDdc } from './helpers/ddcFunctions'

class App extends Component {
  state = {
    currentView: []
  }

  handleSearch = e => {
    const results = searchDdc(e.target.value)
    this.setState({
      currentView: results ? results : []
    })
  }

  handleClick = e => {
    const results = retrieveDdc(e)
    this.setState({
      currentView: results ? results : []
    })
  }

  componentDidMount () {
    const results = retrieveDdc("xxx")
    // const results = searchDdc('book')
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
