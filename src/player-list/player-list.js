import React, { useContext, useState, useEffect, useCallback } from 'react'
import { SearchContext, SelectedContext, FavoritesContext } from '../app'
import { Player } from '../player/player'
import { albums, getId } from '../lib/data'
import { searchList } from '../lib/util'

export function PlayerList ({ hueShift }) {
  const [search] = useContext(SearchContext)
  const [selected] = useContext(SelectedContext)
  const [showFavorites] = useContext(FavoritesContext)
  const [matches, setMatches] = useState(albums.map(getId))
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = useCallback((id, show) => {
    setFavorites(favorites => show
      ? [...favorites, id]
      : favorites.filter(favorite => favorite !== id)
    )
  }, [])

  useEffect(() => {
    setMatches(searchList(albums, ['artist', 'title', 'tags'], search).map(getId))
  }, [search])

  return (
    <ul>
      {albums.map(album => (
        <li key={album.id} hidden={
          !matches.includes(album.id) ||
          (!search.trim() && !selected.includes(album.id)) ||
          (showFavorites && !favorites.includes(album.id))
        }>
          <Player album={album} hueShift={hueShift} onFavoriteToggle={toggleFavorite} />
        </li>
      ))}
    </ul>
  )
}
