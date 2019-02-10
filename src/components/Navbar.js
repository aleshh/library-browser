import React from 'react'
import { Home, ChevronLeft, ChevronRight } from 'react-feather'

function Search ({ searchTerm, handleSearch }) {
  return (
    <div className='navbar'>
      <div className='button'><Home /></div>
      <div className='button'><ChevronLeft /></div>
      <div className='button'><ChevronRight /></div>
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
