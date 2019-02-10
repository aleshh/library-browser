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
            const w = cleanupWord(word)

            return (
              <span key={id + word + item.id}>
                {w.pre}
                <span
                  className='clickable-word'
                  onClick={() => handleClick(w.word)}
                >
                  {w.word}
                </span>
                {w.post + ' '}
              </span>
            )
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

const cleanupWord = word => {
  const cleanWord = { pre: '', word: word, post: '' }
  const wordEnd = word.length - 1

  if (['(', '['].includes(word.substring(0,1))) {
    cleanWord.pre = word.substring(0, 1)
    cleanWord.word = word.substring(1)
  }
  if ([')', ']'].includes(word.substring(wordEnd))) {
    cleanWord.post = word.substring(wordEnd)
    cleanWord.word = cleanWord.word.substring(0, wordEnd - 1)
  }
  return cleanWord
}

export default Entry
