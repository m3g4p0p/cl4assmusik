import React, { useState, useCallback, createContext } from 'react'
import albums from './albums.json'
import { Bandcamp } from './bandcamp'
import { useObserver } from './observer'

export const ObserverContext = createContext()

function App () {
  const [list, setList] = useState(albums)

  const removeItem = useCallback(event => {
    const { album } = event.target.dataset

    setList(list => list.filter(item =>
      item.album !== album
    ))
  }, [])

  return (
    <div className='app'>
      <ObserverContext.Provider value={useObserver()}>
        <ul>
          {list.map(item => (
            <li key={item.album}>
              <Bandcamp {...item} />
              <button data-album={item.album} onClick={removeItem}>remove</button>
            </li>
          ))}
        </ul>
      </ObserverContext.Provider>
    </div>
  )
}

export default App
