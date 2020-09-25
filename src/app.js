import React, { createContext, useEffect } from 'react'
import { useObserver, IntersectionObserver, ResizeObserver } from './lib/observer'
import { useStoredState } from './lib/storage'
import { firstForArtist } from './lib/data'
import { createProvider } from './lib/provider'
import { throttleRAF } from './lib/util'
import { Hero } from './hero/hero'
import { SearchBox } from './search-box/search-box'
import { PlayerList } from './player-list/player-list'

export const IntersectionContext = createContext(null)
export const SearchContext = createContext(null)
export const SelectedContext = createContext(null)
export const FavoritesContext = createContext(null)

const SearchProvider = createProvider(SearchContext, useStoredState, 'search', '')
const SelectedProvider = createProvider(SelectedContext, useStoredState, 'selected', firstForArtist)
const FavoritesProvider = createProvider(FavoritesContext, useStoredState, 'show_favorites', false)

const adjustHueShift = throttleRAF(() => {
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight
  const scrollDegree = window.scrollY / scrollMax * 360 || 0
  document.documentElement.style.setProperty('--hue-shift', scrollDegree)
})

export function App () {
  const observer = useObserver(IntersectionObserver)

  useEffect(() => {
    window.addEventListener('scroll', adjustHueShift)
    return () => window.removeEventListener('scroll', adjustHueShift)
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver()
    observer.observe(document.body, adjustHueShift)
    return () => observer.disconnect()
  }, [])

  return (
    <div className='app'>
      <Hero headline='cl4ss musik' copy='ön ßandcamp' />

      <IntersectionContext.Provider value={observer}>
        <SearchProvider>
          <SelectedProvider>
            <FavoritesProvider>
              <SearchBox />
              <PlayerList />
            </FavoritesProvider>
          </SelectedProvider>
        </SearchProvider>
      </IntersectionContext.Provider>
    </div>
  )
}
