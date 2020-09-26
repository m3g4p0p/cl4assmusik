import React, { memo, useCallback, useState, useMemo } from 'react'
import { PlayerHead } from '../player-head/player-head'
import { LazyIframe } from '../lazy-iframe/lazy-iframe'
import { AlbumLink } from '../album-link/album-link'
import { useStoredState } from '../lib/storage'
import { assemble } from '../lib/util'
import { getHSV } from '../lib/color'
import './player.scss'

const BASE_URL = 'https://bandcamp.com/EmbeddedPlayer/'

function encodeOptions (options) {
  return Object
    .entries(options)
    .map(entry => entry.map(encodeURIComponent).join('='))
    .join('/')
}

export const Player = memo(function Player ({ album, isFavorite, showRelated }) {
  const [showTracklist, setShowTracklist] = useStoredState(['tracklist', album.id], false)
  const [isLoading, setIsLoading] = useState(true)
  const { title, params } = album
  const color = useMemo(() => getHSV(params.linkcol), [params.linkcol])

  return (
    <div
      className={'player'}
      style={{
        '--linkcol-hue': color.hue,
        '--linkcol-saturation': color.saturation,
        '--linkcol-lightness': color.lightness,
        '--bgcol': `#${params.bgcol}`
      }}
    >
      <PlayerHead
        album={album}
        isFavorite={isFavorite}
        onToggleTracklist={setShowTracklist}
      />

      <LazyIframe
        title={title}
        src={BASE_URL + encodeOptions(params)}
        onLoad={useCallback(() => {
          setIsLoading(false)
        }, [setIsLoading])}
        className={assemble(
          isLoading && '-is-loading',
          showTracklist && '-is-expanded'
        )}
        seamless
      ><AlbumLink album={album} /></LazyIframe>
    </div>
  )
})
