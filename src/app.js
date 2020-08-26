import React from 'react'
import albums from './albums.json'
import { Bandcamp } from './bandcamp'

function App () {
  return (
    <div className='app'>
      <ul>
        {albums.map(item => (
          <li key={item.album}>
            <Bandcamp {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
