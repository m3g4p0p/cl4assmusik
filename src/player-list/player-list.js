import React, { useContext, useState, useEffect } from 'react'
import { SearchContext, SelectedContext } from '../app'
import { Player } from '../player/player'
import { albums, getId } from '../lib/data'
import { searchList } from '../lib/util'

export function PlayerList ({ hueShift }) {
  const [search] = useContext(SearchContext)
  const [selected] = useContext(SelectedContext)
  const [matches, setMatches] = useState(albums.map(getId))

  useEffect(() => {
    setMatches(searchList(albums, ['artist', 'title', 'tags'], search).map(getId))
  }, [search])

  return (
    <ul>
      {albums.map(album => (
        <li key={album.id} hidden={
          !matches.includes(album.id) ||
          (!selected.includes(album.id) && !search.trim())
        }>
          <Player album={album} hueShift={hueShift} />
        </li>
      ))}
    </ul>
  )
}
