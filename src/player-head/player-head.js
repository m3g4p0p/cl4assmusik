import React from 'react'
import { AlbumLink } from '../album-link/album-link'
import { FavoriteToggle } from '../favorite-toggle/favorite-toggle'
import { ToggleButton } from '../toggle-button/toggle-button'
import { RelatedList } from '../related-list/related-list'
import { TagList } from '../tag-list/tag-list'
import './player-head.scss'

export function PlayerHead ({ album, isFavorite, onToggleTracklist }) {
  const { id, tags, related } = album

  return (
    <div className='player-head'>
      <h2 className='title'>
        <AlbumLink album={album} />
      </h2>

      <TagList tags={tags} />
      <RelatedList related={related} />

      <div className='controls'>
        <ToggleButton
          className='tracklist-toggle'
          onToggle={onToggleTracklist}
        >tracklist</ToggleButton>

        <FavoriteToggle
          active={isFavorite}
          type='toggle_id'
          payload={id}
        />
      </div>
    </div>
  )
}
