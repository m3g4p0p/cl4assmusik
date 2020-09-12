import React, { useState, createContext, useEffect } from 'react'
import config from './config.json'
import { SearchBox } from './search-box/search-box'
import { Player } from './player/player'
import { useObserver } from './observer'
import { useStoredState } from './storage'
import { searchList } from './lib'
import { randomizeHue } from './color'

export const ObserverContext = createContext(null)
export const SearchContext = createContext(null)
const oberverOptions = { threshold: [0, 1] }
const MAX_HUE_DELTA = 180

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
    bgcol: randomizeHue(album.params.bgcol, MAX_HUE_DELTA),
    linkcol: randomizeHue(album.params.linkcol, MAX_HUE_DELTA)
  }
})).sort((a, b) => stringifyAlbum(a) < stringifyAlbum(b) ? -1 : 1)

function stringifyAlbum ({ artist, title }) {
  return `${artist} ${title}`
}

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

export function App () {
  const [list, setList] = useState(albums)
  const [search, setSearch] = useStoredState('_search', '')
  const [hueShift, setHueShift] = useState(0)
  const observer = useObserver(oberverOptions)

  useEffect(() => {
    const handleScroll = throttleRAF(() => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight
      setHueShift(window.scrollY / scrollMax * 360)
    })

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
        <SearchContext.Provider value={[search, setSearch]}>
          <SearchBox />

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
