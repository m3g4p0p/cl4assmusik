import React, { useCallback } from 'react'
import './search-box.scss'

export function SearchBox ({ searchState: [search, setSearch], ...props }) {
  return (
    <div className='search-box'>
      <input
        {...props}
        type='text'
        value={search}
        onChange={useCallback(event => {
          setSearch(event.target.value)
        }, [setSearch])}
      />
    </div>
  )
}
