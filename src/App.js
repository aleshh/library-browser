import React, { Component } from 'react'
import Entry from './components/Entry'
import Navbar from './components/Navbar'
import DDC from 'ddc-browser'

class App extends Component {
  constructor(props) {
    super(props)
    this.ddc = new DDC()
    this.state = {
      searchTerm: '',
      currentLocation: '',
      currentView: []
    }
  }

  /**
   * Pull up the search results for any string
   * @param string search term
   */
  search = searchTerm => {
    const results = this.ddc.search(searchTerm)
    this.setState({
      searchTerm: searchTerm,
      currentLocation: '',
      currentView: results ? results : []
    })
    window.location = '#' + searchTerm
  }

  /**
   * Pull up the listing for a 3-digit code
   * @param string a valid 3-digit code
   */
  retrieve = location => {
    const results = this.ddc.retrieve(location)
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

  /**
   * Return home if blank, search if 3 or more character string
   * @param event from the search form
   */
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

  /**
   * retrieves results for a nuber if valid, otherwise does a search
   * @param string input: a 3-digit location code or any string
   */
  handleInput = input => {
    if (this.validNumber(input)) {
      this.retrieve(input)
    } else {
      this.search(input)
    }
  }


  /**
   * Handle clicks on the home, back, and forwards buttons
   * @param string button: name of one of the 3 buttons
   */
  handleButton = (button) => {
    switch (button) {
      case 'home':
        this.retrieve('xxx')
        break
      case 'back':
        window.history.back()
        this.gotoUri()
        break
      case 'forward':
        window.history.forward()
        this.gotoUri()
        break
      default:
        console.error('Did not recognize that button')
    }
  }

  /**
   * Gets the location from the URI and feeds it to handleInput
   * after a slight delay
   */
  gotoUri = () => {
    // this seems gross, but adding a 1/10 second delay gives
    // window.history.back and forward to update before we load
    // the location.
    setTimeout(() => {
      const uriLocation = window.location.hash.slice(1)
      if (uriLocation.length === 0) {
        this.retrieve('xxx')
        return
      }

      this.handleInput(uriLocation)
    }, 100);
  }

  /**
   * Returns true if input is a valid 3-digit code
   * @param string
   * @returns boolean true if a valid location code
   */
  validNumber = number => (/^\d{3}$|^\d{2}x$|^\dxx$|^x{3}$/.test(number))

  componentWillMount () {
    this.gotoUri()
  }

  render () {
    return (
      <div className='App'>
        <Navbar
          handleButton={this.handleButton}
          searchTerm={this.state.searchTerm}
          handleSearch={this.handleSearch}
        />
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
