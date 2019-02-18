import React, { Component } from 'react'
import { ChevronsRight, ChevronRight } from 'react-feather'

class Entry extends Component {
  state = {
    hover: false
  }

  hoverStateOn = () => {
    this.setState({
      hover: true
    })
  }

  hoverStateOff = () => {
    this.setState({
      hover: false
    })
  }

  render () {
    const { entry, currentLocation, handleClick } = this.props
    const unclickableWords = ['the', '&', 'and', 'to', 'of', 'in']
    const item = entry[entry.length - 1]
    const path = entry.slice(0, -1)
    const itemClass = item.subordinates ?  'result result-clickable' : 'result'

    return (
      <div className='result-row' key={item.id + item.number}>
        { (path.length > 0) ? (
          <p className='result-path'>
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

        <p
          className={(this.state.hover && item.subordinates)
            ? 'result result-hovered'
            : itemClass
          }
          onClick={() => {
            if (item.subordinates) {
              handleClick(item.id)
            }
          }}
          onMouseEnter={this.hoverStateOn}
          onMouseLeave={this.hoverStateOff}
        >
          <span
            key={item.id}
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
                    onMouseEnter={this.hoverStateOff}
                    onMouseLeave={this.hoverStateOn}
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

          {item.subordinates
            ? <span
              key={'chevrons ' + item.id}
              onClick={() => {
                if (item.subordinates) {
                  handleClick(item.id)
                }
              }}
              className='clickable'
            >
              <ChevronsRight />
            </span>
            : ''
          }
        </p>
      </div>
    )
  }
}

const cleanupWord = word => {
  const cleanWord = { pre: '', word: word, post: '' }

  if (['(', '['].includes(word.substring(0,1))) {
    cleanWord.pre = word.substring(0, 1)
    cleanWord.word = word.substring(1)
  }

  // all this nonsense, because sometimes there's a comma after a close
  // parenthesees! e.g., browse to 348 to see this in glorious action ¯\_(ツ)_/¯
  while ([')', ']', ',', ';'].includes(
    cleanWord.word.substring(cleanWord.word.length - 1)
  )) {
    cleanWord.post = cleanWord.word.substring(cleanWord.word.length - 1) +
      cleanWord.post
    cleanWord.word = cleanWord.word.substring(0, cleanWord.word.length - 1)
  }

  return cleanWord
}

export default Entry
