import React, { Component } from 'react'
import ddc from './data/ddcIndex.json'

class App extends Component {
  state = {
    currentView: []
  }

  retrieveDdc = number => {
    // test if number is three digits, optionally with some x's at the end
    // should not happen: this func only gets called from inside the house
    if (!/^\d{3}$|^\d{2}x$|^\dxx$|^x{3}$/.test(number)) {
      console.error('retrieveDdc received something other than a 3-digit num')
      return
    }

    let depth
    switch (number.indexOf('x')) {
      case 2:  depth = 2; break // thousands
      case 1:  depth = 1; break // hundreds
      case 0:  depth = 0; break // main classes
      case -1: depth = 3; break // regular numbers
      default: console.error('')  // we already checked
    }

    const results = []

    // hideous tangle of nested loops. fix me! hopefully with recursion?
    ddc.forEach(mainClass => {
      if (depth === 0) {
        results.push([mainClass])
      } else {
        if (number.charAt(0) === mainClass.number.charAt(0)) {
          mainClass.subordinates.forEach(hundredsClass => {
            if (depth === 1) {
              results.push([mainClass, hundredsClass])
            } else {
              if (number.charAt(1) === hundredsClass.number.charAt(1)) {
                hundredsClass.subordinates.forEach(thousandsClass => {
                  if (depth === 2) {
                    results.push([mainClass, hundredsClass, thousandsClass])
                  } else {
                    if (number.charAt(2) === thousandsClass.number.charAt(2)) {
                      thousandsClass.subordinates
                        .forEach(number => results.push(
                          [mainClass, hundredsClass, thousandsClass, number]
                          ))
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    this.setState({
      currentView: results ? results : []
    })
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
    console.log(results)
    this.setState({
      currentView: results ? results : []
    })
  }

  handleClick = e => {
    this.retrieveDdc(e)
  }

  componentDidMount () {
    this.retrieveDdc("xxx")
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
            <Entry
              key={result[result.length - 1].id}
              entry={result}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

const entryToString = entry => (entry.number + ' ' + entry.description)

const Entry = ({entry, handleClick}) => {
  const item = entry[entry.length - 1]
  const path = entry.slice(0, -1)
  return (
    <div className='result-row' key={item.id}>
      <p className='result-path'>
        {path.map(item => (
          <span
            key={item.id}
            onClick={() => handleClick(item.id)}
            className='clickable'
          >
            {entryToString(item)}
          </span>
        ))}
      </p>
      <p onClick={() => handleClick(item.id)} className='result clickable'>
        {entryToString(item)}
      </p>
    </div>
  )
}

export default App
