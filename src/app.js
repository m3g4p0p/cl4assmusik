import React, { useState, createContext, useEffect } from 'react'
import config from './config.json'
import { SearchBox } from './search-box/search-box'
import { Player } from './player/player'
import { useObserver } from './observer'
import { searchList } from './lib'

export const ObserverContext = createContext(null)
export const SearchContext = createContext(null)
const observerOptions = { once: true }

const albums = config.albums.map(album => ({
  ...album,
  params: {
    ...config.defaults,
    ...album.params
  }
})).sort((a, b) => a.title < b.title ? -1 : 1)

export function App () {
  const [list, setList] = useState(albums)
  const [search, setSearch] = useState('')
  const observer = useObserver(observerOptions)

  useEffect(() => {
    setList(searchList(albums, ['artist', 'title', 'tags'], search))
  }, [search])

  return (
    <div className='app'>
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
