import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../app'
import './search-box.scss'

export function SearchBox (props) {
  const setSearch = useContext(SearchContext)

  return (
    <form className='search-box'>
      <label className='search-field'>
        Search
        <input
          {...props}
          type='text'
          onChange={useCallback(event => {
            setSearch(event.target.value)
          }, [setSearch])}
        />
      </label>

      <button
        className='reset-button'
        type='reset'
        onClick={useCallback(() => {
          setSearch('')
        }, [setSearch])}
      >&#128473;</button>
    </form>
  )
}
