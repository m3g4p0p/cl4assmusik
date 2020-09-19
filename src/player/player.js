import React, { useCallback, useState } from 'react'
import { TagList } from '../tag-list/tag-list'
import { RelatedList } from '../related-list/related-list'
import { LazyIframe } from '../lazy-iframe/lazy-iframe'
import { ToggleButton } from '../toggle-button/toggle-button'
import { useStoredState } from '../lib/storage'
import { assemble } from '../lib/util'
import { shiftHue } from '../lib/color'
import './player.scss'

const BASE_URL = 'https://bandcamp.com/EmbeddedPlayer/'

function encodeOptions (options) {
  return Object
    .entries(options)
    .map(entry => entry.map(encodeURIComponent).join('='))
    .join('/')
}

function getTrackListKey (id) {
  return `tracklist_${id}`
}

export function Player ({ album, hueShift }) {
  const { artist, title, link, tags, params, related } = album
  const [isLoading, setIsLoading] = useState(true)
  const [showTracklist, setShowTracklist] = useStoredState(getTrackListKey(album.id), false)
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

      <TagList tags={tags} />
      <RelatedList related={related} />

      <div className='controls'>
        <ToggleButton
          className='tracklist-toggle'
          state={showTracklist}
          setState={setShowTracklist}
        >tracklist</ToggleButton>
      </div>

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
