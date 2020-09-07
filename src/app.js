import React, { useState, createContext, useEffect } from 'react'
import Color from 'color-js'
import config from './config.json'
import { SearchBox } from './search-box/search-box'
import { Player } from './player/player'
import { useObserver } from './observer'
import { useStoredState } from './storage'
import { searchList } from './lib'

export const ObserverContext = createContext(null)
export const SearchContext = createContext(null)
const oberverOptions = { threshold: [0, 1] }

function shiftHue (rgbString, maxDelta) {
  const delta = maxDelta - Math.round(Math.random() * maxDelta * 2)
  return Color('#' + rgbString).shiftHue(delta).toCSS().slice(1)
}

const throttleRAF = callback => {
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

const MAX_DELTA = 180

const albums = config.albums.map(album => ({
  ...album,
  tags: album.tags && album.tags.map(tag => `#${tag}`),
  params: {
    ...config.defaults,
    ...album.params
  }
})).map(album => ({
  ...album,
  params: {
    ...album.params,
    bgcol: shiftHue(album.params.bgcol, MAX_DELTA),
    linkcol: shiftHue(album.params.linkcol, MAX_DELTA)
  }
})).sort((a, b) => a.title < b.title ? -1 : 1)

export function App () {
  const [list, setList] = useState(albums)
  const [search, setSearch] = useStoredState('_search', '')
  const [hueShift, setHueShift] = useState(0)
  const observer = useObserver(oberverOptions)

  useEffect(() => {
    const handleScroll = throttleRAF(() => setHueShift((window.scrollY / 10) % 360))
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  useEffect(() => {
    setList(searchList(albums, ['artist', 'title', 'tags'], search))
  }, [search])

  return (
    <div className='app'>
      <h1 className='hero'>kl4ss musik</h1>

      <ObserverContext.Provider value={observer}>
        <SearchContext.Provider value={setSearch}>
          <SearchBox value={search} />

          <ul>
            {albums.map(item => (
              <li key={item.params.album} hidden={!list.includes(item)}>
                <Player {...item} hueShift={hueShift} />
              </li>
            ))}
          </ul>
        </SearchContext.Provider>
      </ObserverContext.Provider>
    </div>
  )
}
