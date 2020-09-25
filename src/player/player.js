import React, { useCallback, useState, useMemo, useContext } from 'react'
import { TagList } from '../tag-list/tag-list'
import { RelatedList } from '../related-list/related-list'
import { LazyIframe } from '../lazy-iframe/lazy-iframe'
import { ToggleButton } from '../toggle-button/toggle-button'
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle'
import { FavoritesContext, isFavorite } from '../lib/favorites'
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

export function Player ({ album, showRelated, dispatch }) {
  const { id, artist, title, tags, params, related } = album
  const [showTracklist, setShowTracklist] = useStoredState(['tracklist', album.id], false)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites] = useContext(FavoritesContext)
  const color = useMemo(() => getHSV(params.linkcol), [params.linkcol])
  const link = <a href={album.link} target='_blank' rel='noopener noreferrer'>{artist} - {title}</a>

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
      <RelatedList related={showRelated && related} />

      <div className='controls'>
        <ToggleButton
          className='tracklist-toggle'
          update={setShowTracklist}
        >tracklist</ToggleButton>

        <FavoriteToggle
          active={isFavorite(favorites, id)}
          type='toggle_id'
          payload={id}
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
