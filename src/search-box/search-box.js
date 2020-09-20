import React, { useCallback, useContext, useRef, useEffect } from 'react'
import { SearchContext, IntersectionContext, FavoritesContext } from '../app'
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle'
import { useObservedRef } from '../lib/observer'
import { assemble } from '../lib/util'
import './search-box.scss'

function selectTag ({ target }) {
  const { value, selectionStart, selectionEnd } = target

  if (selectionStart !== selectionEnd) {
    return
  }

  const wordStart = value.slice(0, selectionStart).match(/\S*$/).pop()
  const wordEnd = value.slice(selectionEnd).match(/^\S*/).pop()

  if (wordStart[0] === '#') {
    target.selectionStart = selectionStart - wordStart.length
    target.selectionEnd = selectionEnd + wordEnd.length
  }
}

export function SearchBox (props) {
  const [search, setSearch] = useContext(SearchContext)
  const observer = useContext(IntersectionContext)
  const [stickyRef, { intersectionRatio }] = useObservedRef(observer)
  const inputRef = useRef()

  const handleKeyDown = useCallback(({ key, target }) => {
    const { current } = inputRef

    if (target !== current && (
      key.length === 1 ||
      key === 'Backspace'
    )) {
      setSearch(search => search.trim())
      current.focus()
    }

    if (key === 'Escape') {
      setSearch('')
    }
  }, [inputRef, setSearch])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      <div
        ref={stickyRef}
        className='sticky-sentinel'
      />

      <form
        className={assemble(
          'search-box',
          intersectionRatio < 1 && '-is-sticky',
          intersectionRatio === 0 && '-is-hiding'
        )}
      >
        <FavoriteToggle hook={useContext(FavoritesContext)} />

        <label className='search-field'>
          Search
          <input
            {...props}
            type='text'
            ref={inputRef}
            value={search}
            onChange={useCallback(event => {
              setSearch(event.target.value)
            }, [setSearch])}
            onMouseUp={selectTag}
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
    </>
  )
}
