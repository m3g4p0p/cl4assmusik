import React, { useContext, useState, useEffect } from 'react'
import { SearchContext, SelectedContext } from '../app'
import { FavoritesContext, filterFavorites } from '../lib/favorites'
import { Player } from '../player/player'
import { albums, getId } from '../lib/data'
import { searchList } from '../lib/util'

export function PlayerList () {
  const [search] = useContext(SearchContext)
  const [selected] = useContext(SelectedContext)
  const [favorites] = useContext(FavoritesContext)
  const [matches, setMatches] = useState(albums.map(getId))
  const splitRelated = search.trim() || favorites.show

  useEffect(() => {
    setMatches(searchList(albums, ['artist', 'title', 'tags'], search).map(getId))
  }, [search])

  return (
    <ul>
      {albums.map(album => (
        <li key={album.id} hidden={
          !filterFavorites(favorites, matches).includes(album.id) ||
          !(splitRelated || selected.includes(album.id))
        }>
          <Player
            album={album}
            showRelated={!splitRelated}
          />
        </li>
      ))}
    </ul>
  )
}
