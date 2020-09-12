import React, { useCallback, useState } from 'react'
import { TagList } from '../tag-list/tag-list'
import { LazyIframe } from '../lazy-iframe'
import { useStoredState } from '../storage'
import { assemble } from '../lib'
import { shiftHue } from '../color'
import './player.scss'

const BASE_URL = 'https://bandcamp.com/EmbeddedPlayer/'

function encodeOptions (options) {
  return Object
    .entries(options)
    .map(entry => entry.map(encodeURIComponent).join('='))
    .join('/')
}

export function Player ({ artist, title, link, tags, params, hueShift }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showTracklist, setShowTracklist] = useStoredState(params.album, false)
  const anchor = <a href={link} target='_blank' rel='noopener noreferrer'>{artist} - {title}</a>

  return (
    <div
      className={assemble(
        'player',
        showTracklist && '-with-tracklist',
        isLoading && '-is-loading'
      )}
      style={{
        '--link-color': `#${shiftHue(params.linkcol, hueShift)}`,
        '--background-color': `#${params.bgcol}`
      }}
    >
      <h2 className='title'>{anchor}</h2>
      {tags && <TagList tags={tags} />}

      <button
        className='tracklist-toggle'
        onClick={useCallback(() => {
          setShowTracklist(showTracklist => !showTracklist)
        }, [setShowTracklist])}
      >tracklist</button>

      <LazyIframe
        title={title}
        src={BASE_URL + encodeOptions(params)}
        onLoad={useCallback(() => {
          setIsLoading(false)
        }, [setIsLoading])}
        seamless
      >{anchor}</LazyIframe>
    </div>
  )
}
