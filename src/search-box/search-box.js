import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../app'
import './search-box.scss'

export function SearchBox (props) {
  const setSearch = useContext(SearchContext)

  return (
    <div className='search-box'>
      <input
        {...props}
        type='text'
        onChange={useCallback(event => {
          setSearch(event.target.value)
        }, [setSearch])}
      />
    </div>
  )
}
