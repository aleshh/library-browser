import React from 'react'

function Search({handleSearch}) {
  return (
    <div className='search'>
    <label htmlFor="search">Search: </label>
      <input
        autoFocus
        type='text'
        name='search'
        onKeyUp={handleSearch}
      />
    </div>
  )
}

export default Search
