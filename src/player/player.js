import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { TagList } from '../tag-list/tag-list'
import { RelatedList } from '../related-list/related-list'
import { LazyIframe } from '../lazy-iframe/lazy-iframe'
import { ToggleButton } from '../toggle-button/toggle-button'
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle'
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

export function Player ({ album, dispatch }) {
  const { artist, title, tags, params, related } = album
  const [isLoading, setIsLoading] = useState(true)
  const [showTracklist, setShowTracklist] = useStoredState(['tracklist', album.id], false)
  const [isFavorite, setIsFavorite] = useStoredState(['favorite', album.id], false)
  const color = useMemo(() => getHSV(params.linkcol), [params.linkcol])
  const link = <a href={album.link} target='_blank' rel='noopener noreferrer'>{artist} - {title}</a>

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: isFavorite ? 'add' : 'remove', id: album.id })
    }
  }, [dispatch, album.id, isFavorite])

  return (
    <div
      className={assemble(
        'player',
        showTracklist && '-with-tracklist',
        isLoading && '-is-loading'
      )}
      style={{
        '--linkcol-hue': color.hue,
        '--linkcol-saturation': color.saturation,
        '--linkcol-lightness': color.lightness,
        '--bgcol': `#${params.bgcol}`
      }}
    >
      <h2 className='title'>{link}</h2>

      <TagList tags={tags} />
      <RelatedList related={related} />

      <div className='controls'>
        <ToggleButton
          className='tracklist-toggle'
          active={showTracklist}
          update={setShowTracklist}
        >tracklist</ToggleButton>

        <FavoriteToggle
          active={isFavorite}
          update={setIsFavorite}
        />
      </div>

      <LazyIframe
        title={title}
        src={BASE_URL + encodeOptions(params)}
        onLoad={useCallback(() => {
          setIsLoading(false)
        }, [setIsLoading])}
        seamless
      >{link}</LazyIframe>
    </div>
  )
}
