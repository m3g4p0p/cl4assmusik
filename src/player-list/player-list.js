import React, { useContext, useState, useEffect, useReducer } from 'react'
import { SearchContext, SelectedContext, FavoritesContext } from '../app'
import { favoritesReducer } from '../lib/favorites'
import { Player } from '../player/player'
import { albums, getId } from '../lib/data'
import { searchList } from '../lib/util'

export function PlayerList () {
  const [search] = useContext(SearchContext)
  const [selected] = useContext(SelectedContext)
  const [showFavorites] = useContext(FavoritesContext)
  const [matches, setMatches] = useState(albums.map(getId))
  const [favorites, dispatchFavorites] = useReducer(favoritesReducer, [])
  const splitRelated = search.trim() || showFavorites

  useEffect(() => {
    const matches = searchList(albums, ['artist', 'title', 'tags'], search).map(getId)
    setMatches(showFavorites ? matches.filter(id => favorites.includes(id)) : matches)
  }, [search, favorites, showFavorites])

  return (
    <ul>
      {albums.map(album => (
        <li key={album.id} hidden={
          !matches.includes(album.id) ||
          !(splitRelated || selected.includes(album.id))
        }>
          <Player
            album={album}
            showRelated={!splitRelated}
            dispatch={dispatchFavorites}
          />
        </li>
      ))}
    </ul>
  )
}
