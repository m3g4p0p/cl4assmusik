import React, { useCallback } from 'react'
import { TagList } from '../tag-list/tag-list'
import { LazyIframe } from '../lazy-iframe'
import { useStoredState } from '../hooks'
import { assemble } from '../lib'
import './player.scss'

const BASE_URL = 'https://bandcamp.com/EmbeddedPlayer/'

function encodeOptions (options) {
  return Object
    .entries(options)
    .map(entry => entry.map(encodeURIComponent).join('='))
    .join('/')
}

export function Player ({ artist, title, link, tags, params }) {
  const [showPlaylist, setShowPlaylist] = useStoredState(params.album, false)
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
      <TagList tags={tags} />

      <button
        className='playlist-toggle'
        onClick={useCallback(() => {
          setShowPlaylist(showPlaylist => !showPlaylist)
        }, [setShowPlaylist])}
      >playlist</button>

      <LazyIframe
        title={title}
        src={BASE_URL + encodeOptions(params)}
        seamless
      >{anchor}</LazyIframe>
    </div>
  )
}
