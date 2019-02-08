import React from 'react'

function Search ({ searchTerm, handleSearch }) {
  return (
    <div className='search'>
      <label htmlFor='search'>Search: </label>
      <input
        value={searchTerm}
        autoFocus
        type='text'
        name='search'
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search
