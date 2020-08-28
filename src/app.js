import React, { useState, useCallback, createContext, useEffect } from 'react'
import albums from './albums.json'
import { Bandcamp } from './bandcamp'
import { useObserver } from './observer'

export const ObserverContext = createContext()

function App () {
  const [options, setOptions] = useState()
  const [threshold, setThreshold] = useState(0)
  const [list, setList] = useState(albums)

  const removeItem = useCallback(event => {
    const { album } = event.target.dataset

    setList(list => list.filter(item =>
      item.album !== album
    ))
  }, [])

  useEffect(() => {
    setOptions({ threshold })
  }, [threshold])

  return (
    <div className='app'>
      <div>
        <input
          type='number'
          min='0'
          max='1'
          step='0.1'
          value={threshold}
          onChange={event => setThreshold(event.target.value)}
        />
      </div>

      <ObserverContext.Provider value={useObserver(options)}>
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
