import React, { useCallback, useState } from 'react'
import { LazyIframe } from '../lazy-iframe'
import { assemble } from '../lib'
import './player.scss'

const BASE_URL = 'https://bandcamp.com/EmbeddedPlayer/'

const encodeOptions = options => Object
  .entries(options)
  .map(entry => entry.map(encodeURIComponent).join('='))
  .join('/')

export function Player ({ artist, title, link = '', params }) {
  const [showPlaylist, setShowPlaylist] = useState(false)
  const anchor = <a href={link} target='_blank' rel='noopener noreferrer'>{artist} - {title}</a>

  return (
    <div
      className={assemble(
        'player',
        showPlaylist && '-with-playlist'
      )}
      style={{ '--link-color': `#${params.linkcol}` }}
    >
      <h2 className='title'>{anchor}</h2>

      <button
        className='playlist-toggle'
        onClick={useCallback(() => {
          setShowPlaylist(showPlaylist => !showPlaylist)
        }, [])}
      >playlist</button>

      <LazyIframe
        title={title}
        src={BASE_URL + encodeOptions(params)}
        seamless
      >{anchor}</LazyIframe>
    </div>
  )
}
