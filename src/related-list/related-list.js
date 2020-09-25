import React, { useCallback, useContext } from 'react'
import { SelectedContext } from '../app'
import { FavoritesContext, isFavorite } from '../lib/favorites'
import { FavoriteIcon } from '../favorite-icon/favorite-icon'
import { getAlbum } from '../lib/data'
import { hasValues } from '../lib/util'
import './related-list.scss'

export function RelatedList ({ related }) {
  const albums = related && related.map(getAlbum)
  const [, setSelected] = useContext(SelectedContext)
  const [favorites] = useContext(FavoritesContext)

  const selectAlbum = useCallback(event => {
    const { id, related } = getAlbum(event.target.dataset.id)

    event.preventDefault()
    setSelected(selected => selected.filter(id => !related.includes(id)).concat([id]))
  }, [setSelected])

  return hasValues(albums) ? (
    <div className='related-list'>
      {albums.map(({ id, title, link }) => (
        <a onClick={selectAlbum} key={id} data-id={id} href={link}>
          {title}
          <FavoriteIcon active={isFavorite(favorites, id)} />
        </a>
      ))}
    </div>
  ) : null
}
