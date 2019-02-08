import React from 'react'
import { Home, ChevronsRight, ChevronRight } from 'react-feather'

function Entry ({ entry, showHome, currentLocation, handleClick }) {
  const item = entry[entry.length - 1]
  const path = entry.slice(0, -1)
  console.log('path:', (showHome || (path.length > 0)))
  return (
    <div className='result-row' key={item.id}>
      { (showHome || (path.length > 0)) ? (
        <p className='result-path'>
          { showHome ? (
            <React.Fragment>
              <span
                key='home'
                onClick={() => handleClick('xxx')}
                className='clickable home'
              >
                <Home />
              </span>
              <ChevronRight className='path-separator' />
            </React.Fragment>
          ) : null
          }
          {path.map((item, i, arr) => (
            <React.Fragment>
              <span
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={(item.id !== currentLocation) ? 'clickable' : ''}
              >
                {entryToString(item)}
              </span>
              { (i !== arr.length - 1) ?
                <ChevronRight className='path-separator' /> :
                ''
              }
            </React.Fragment>
          ))}
        </p>
      ) : null }
      <p
        onClick={() => {
          if (item.subordinates) {
            handleClick(item.id)
          }
        }}
        className={item.subordinates ? 'result clickable' : 'result'}
      >
        {entryToString(item)}
        {item.subordinates ? <ChevronsRight /> : ''}
      </p>
    </div>
  )
}

const entryToString = entry => (entry.number + ' ' + entry.description)

export default Entry
