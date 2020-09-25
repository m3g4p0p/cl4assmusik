import React, { useCallback, useContext, useRef, useEffect, useState } from 'react'
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle'
import { SearchContext, IntersectionContext } from '../app'
import { FavoritesContext } from '../lib/favorites'
import { useObservedRef } from '../lib/observer'
import { assemble, throttleRAF } from '../lib/util'
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

function useCanHide () {
  const [canHide, setCanHide] = useState(false)

  useEffect(() => {
    let scrollY = window.scrollY

    const handleScroll = throttleRAF(() => {
      setCanHide(window.scrollY > scrollY)
      scrollY = window.scrollY
    })

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (canHide) {
      return
    }

    const handle = window.setTimeout(setCanHide, 1000, true)
    return () => window.clearTimeout(handle)
  }, [canHide])

  return canHide
}

function useFocusRef (setValue) {
  const inputRef = useRef()

  const handleKeyDown = useCallback(({ key, target }) => {
    const { current } = inputRef

    if (target !== current && (
      key.length === 1 ||
      key === 'Backspace'
    )) {
      setValue(value => value.trim())
      current.focus({ preventScroll: true })
    }

    if (key === 'Escape') {
      setValue('')
    }
  }, [setValue])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return inputRef
}

export function SearchBox (props) {
  const [search, setSearch] = useContext(SearchContext)
  const [favorites] = useContext(FavoritesContext)
  const inputRef = useFocusRef(setSearch)
  const observer = useContext(IntersectionContext)
  const [stickyRef, { isIntersecting }] = useObservedRef(observer)
  const isSticky = !isIntersecting
  const canHide = useCanHide() && isSticky

  return (
    <>
      <div
        ref={stickyRef}
        className='sticky-sentinel'
      />

      <form
        className={assemble(
          'search-box',
          isSticky && '-is-sticky',
          canHide && '-can-hide'
        )}
      >
        <FavoriteToggle
          active={favorites.show}
          type='toggle_show'
        />

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
