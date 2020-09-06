import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../app'
import { split, toggle, assemble } from '../lib'
import './tag-list.scss'

export function TagList ({ tags, ...props }) {
  const setSearch = useContext(SearchContext)

  const onClick = useCallback(event => {
    event.preventDefault()

    setSearch(search => assemble(toggle(
      split(search),
      event.target.hash
    )))
  }, [setSearch])

  return (tags && <div className='tag-list'>{
    tags.map(tag => <a
      {...props}
      onClick={onClick}
      key={tag}
      href={tag}>{tag}</a>)
  }</div>)
}
