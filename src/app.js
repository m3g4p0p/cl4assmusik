import React, { useState, createContext, useEffect, useCallback } from 'react'
import { useObserver, useObservedRef, IntersectionObserver, ResizeObserver } from './lib/observer'
import { useStoredState } from './lib/storage'
import { firstForArtist } from './lib/data'
import { createProvider } from './lib/provider'
import { Hero } from './hero/hero'
import { SearchBox } from './search-box/search-box'
import { PlayerList } from './player-list/player-list'

export const IntersectionContext = createContext(null)
export const SearchContext = createContext(null)
export const SelectedContext = createContext(null)
export const FavoritesContext = createContext(null)

const SearchProvider = createProvider(SearchContext, useStoredState, 'search', '')
const SelectedProvider = createProvider(SelectedContext, useStoredState, 'selected', firstForArtist)
const FavoritesProvider = createProvider(FavoritesContext, useStoredState, 'favorites', false)
const oberverOptions = { threshold: [0, 1] }

function throttleRAF (callback) {
  let isScheduled = false

  return () => {
    if (isScheduled) {
      return
    }

    isScheduled = true

    window.requestAnimationFrame(() => {
      callback()
      isScheduled = false
    })
  }
}

function useResizeRef () {
  const observer = useObserver(ResizeObserver)
  const [ref, entry] = useObservedRef(observer)

  return [ref, entry?.contentRect?.height]
}

export function App () {
  const [hueShift, setHueShift] = useState(0)
  const [resizeRef, appHeight] = useResizeRef()
  const observer = useObserver(IntersectionObserver, oberverOptions)

  const adjustHueShift = useCallback(throttleRAF(() => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight
    setHueShift(window.scrollY / scrollMax * 360 || 0)
  }), [])

  useEffect(() => {
    window.addEventListener('scroll', adjustHueShift)
    return () => window.removeEventListener('scroll', adjustHueShift)
  }, [adjustHueShift])

  useEffect(() => adjustHueShift(), [adjustHueShift, appHeight])

  return (
    <div className='app' ref={resizeRef}>
      <Hero headline='cl4ss musik' copy='ön ßandcamp' />

      <IntersectionContext.Provider value={observer}>
        <SearchProvider>
          <SelectedProvider>
            <FavoritesProvider>
              <SearchBox />
              <PlayerList hueShift={hueShift} />
            </FavoritesProvider>
          </SelectedProvider>
        </SearchProvider>
      </IntersectionContext.Provider>
    </div>
  )
}
