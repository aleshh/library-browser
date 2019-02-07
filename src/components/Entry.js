import React from 'react'
import { home, chevronsRight } from '../images/featherIcons'

function Entry ({ entry, showHome, handleClick }) {
  const item = entry[entry.length - 1]
  const path = entry.slice(0, -1)
  console.log('path:', (showHome || (path.length > 0)))
  return (
    <div className='result-row' key={item.id}>
      { (showHome || (path.length > 0)) ? (
        <p className='result-path'>
          { showHome ? (
            <span
              key='home'
              onClick={() => handleClick('xxx')}
              className='clickable home'
            >
              { home }
            </span>
          ) : null
          }
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
        {item.subordinates ? chevronsRight : ''}
      </p>
    </div>
  )
}

const entryToString = entry => (entry.number + ' ' + entry.description)

export default Entry
