import React, { useContext, useState, useEffect } from 'react'
import { SearchContext, SelectedContext } from '../app'
import { Player } from '../player/player'
import { albums, getId } from '../lib/data'
import { searchList } from '../lib/util'

export function PlayerList ({ hueShift }) {
  const [list, setList] = useState(albums.map(getId))
  const [search] = useContext(SearchContext)
  const [selected] = useContext(SelectedContext)

  useEffect(() => {
    setList(searchList(albums, ['artist', 'title', 'tags'], search).map(getId))
  }, [search])

  return (
    <ul>
      {albums.map(album => (
        <li key={album.id} hidden={
          !list.includes(album.id) ||
          (!selected.includes(album.id) && !search.trim())
        }>
          <Player album={album} hueShift={hueShift} />
        </li>
      ))}
    </ul>
  )
}
