import React from 'react'
import { Home, ChevronsRight, ChevronRight } from 'react-feather'

function Entry ({ entry, showHome, currentLocation, handleClick }) {
  const unclickableWords = ['the', '&', 'and', 'to', 'of']
  const item = entry[entry.length - 1]
  const path = entry.slice(0, -1)
  return (
    <div className='result-row' key={item.id + item.number}>
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
          ) : null }
          {path.map((item, i, arr) => (
            <React.Fragment key={item.id + item.description}>
              <span
                onClick={() => handleClick(item.id)}
                className={(item.id !== currentLocation) ? 'clickable' : ''}
              >
                {item.number + ' ' + item.description}
              </span>
              { (i !== arr.length - 1)
                ? <ChevronRight className='path-separator' />
                : ''
              }
            </React.Fragment>
          ))}
        </p>
      ) : null }
      <p>
        <span
          key={item.id}
          onClick={() => {
            if (item.subordinates) {
              handleClick(item.id)
            }
          }}
          className={item.subordinates ? 'result clickable' : 'result'}
        >
          {item.number}
        </span>
        &nbsp;&nbsp;
        {item.description.split(' ').map((word, id) => {
          if (!unclickableWords.includes(word.toLowerCase())) {
            return (<span key={id + word + item.id}
              className='clickable-word'
              onClick={() => handleClick(word)}
            >
              {word + ' '}
            </span>)
          } else {
            return word + ' '
          }
        })}
        <span
          key={'chevrons ' + item.id}
          onClick={() => {
            if (item.subordinates) {
              handleClick(item.id)
            }
          }}
          className={item.subordinates ? 'result clickable' : 'result'}
        >
          {item.subordinates ? <ChevronsRight /> : ''}
        </span>
      </p>
    </div>
  )
}

export default Entry
