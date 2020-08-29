import React, { useState, createContext, useEffect } from 'react'
import config from './config.json'
import { SearchBox } from './search-box/search-box'
import { Player } from './player/player'
import { useObserver } from './observer'
import { searchList } from './lib'

export const ObserverContext = createContext()
const observerOptions = { once: true }

const albums = config.albums.map(album => ({
  ...album,
  params: {
    ...config.defaults,
    ...album.params
  }
})).sort((a, b) => a.title < b.title ? -1 : 1)

function App () {
  const [list, setList] = useState(albums)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setList(searchList(albums, ['artist', 'title', 'tags'], search))
  }, [search])

  return (
    <div className='app'>
      <SearchBox searchState={[search, setSearch]} />

      <ObserverContext.Provider value={useObserver(observerOptions)}>
        <ul>
          {albums.map(item => (
            <li key={item.params.album} hidden={!list.includes(item)}>
              <Player {...item} />
            </li>
          ))}
        </ul>
      </ObserverContext.Provider>
    </div>
  )
}

export default App
