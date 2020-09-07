import React, { useState, createContext, useEffect } from 'react'
import config from './config.json'
import { SearchBox } from './search-box/search-box'
import { Player } from './player/player'
import { useObserver } from './observer'
import { useStoredState } from './storage'
import { searchList } from './lib'

export const ObserverContext = createContext(null)
export const SearchContext = createContext(null)
const oberverOptions = { threshold: [0, 1] }

const albums = config.albums.map(album => ({
  ...album,
  tags: album.tags && album.tags.map(tag => `#${tag}`),
  params: {
    ...config.defaults,
    ...album.params
  }
})).sort((a, b) => a.title < b.title ? -1 : 1)

export function App () {
  const [list, setList] = useState(albums)
  const [search, setSearch] = useStoredState('_search', '')
  const observer = useObserver(oberverOptions)

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
                <Player {...item} />
              </li>
            ))}
          </ul>
        </SearchContext.Provider>
      </ObserverContext.Provider>
    </div>
  )
}
