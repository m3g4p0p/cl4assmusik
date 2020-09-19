import React, { useCallback, useContext } from 'react'
import { SelectedContext, SearchContext } from '../app'
import { getAlbum } from '../lib/data'
import './related-list.scss'

export function RelatedList ({ related }) {
  const albums = related.map(getAlbum)
  const [, setSelected] = useContext(SelectedContext)
  const [search] = useContext(SearchContext)

  const selectAlbum = useCallback(event => {
    const { id, related } = getAlbum(event.target.dataset.id)

    event.preventDefault()
    setSelected(selected => selected.filter(id => !related.includes(id)).concat([id]))
  }, [setSelected])

  return !search.trim() && albums.length ? (
    <div className='related-list'>
      {albums.map(({ id, title, link }) => (
        <a onClick={selectAlbum} key={id} data-id={id} href={link}>{title}</a>
      ))}
    </div>
  ) : null
}
