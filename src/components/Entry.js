import React from 'react'

function Entry ({ entry, showHome, handleClick }) {
  const item = entry[entry.length - 1]
  const path = entry.slice(0, -1)
  return (
    <div className='result-row' key={item.id}>
      <p className='result-path'>
        { showHome ? (
          <span
            key='home'
            onClick={() => handleClick('xxx')}
            className='clickable'
          >
            Home
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
      <p
        onClick={() => {
          if (item.subordinates) {
            handleClick(item.id)
          }
        }}
        className='result clickable'
      >
        {entryToString(item)}
        {item.subordinates ? ' >' : ''}
      </p>
    </div>
  )
}

const entryToString = entry => (entry.number + ' ' + entry.description)

export default Entry
