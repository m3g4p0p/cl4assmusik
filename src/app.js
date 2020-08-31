import React, { useState, createContext, useEffect } from 'react'
import config from './config.json'
import { SearchBox } from './search-box/search-box'
import { Player } from './player/player'
import { useObserver } from './observer'
import { searchList } from './lib'

export const AppContext = createContext({})
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
  const observer = useObserver(observerOptions)

  useEffect(() => {
    setList(searchList(albums, ['artist', 'title', 'tags'], search))
  }, [search])

  return (
    <div className='app'>
      <AppContext.Provider value={{ observer, setSearch }}>
        <SearchBox value={search} />

        <ul>
          {albums.map(item => (
            <li key={item.params.album} hidden={!list.includes(item)}>
              <Player {...item} />
            </li>
          ))}
        </ul>
      </AppContext.Provider>
    </div>
  )
}

export default App
