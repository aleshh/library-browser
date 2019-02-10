import React from 'react'
import { Home, ChevronLeft, ChevronRight } from 'react-feather'

function Search ({ handleButton, searchTerm, handleSearch }) {
  return (
    <div className='navbar'>
      <div className='brand'>Wayfarer</div>
      <div
        className='button'
        onClick={() => handleButton('home')}
      >
        <Home />
      </div>
      <div
        className='button'
        onClick={() => handleButton('back')}
      >
        <ChevronLeft />
      </div>
      <div
        className='button'
        onClick={() => handleButton('forward')}
      >
        <ChevronRight />
      </div>
      <div className='search'>
        <label htmlFor='search'>Search: </label>
        <input
          value={searchTerm}
          type='text'
          name='search'
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default Search
