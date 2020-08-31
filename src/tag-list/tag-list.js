import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../app'
import { join, split, toggle } from '../lib'
import './tag-list.scss'

export function TagList ({ tags, ...props }) {
  const setSearch = useContext(SearchContext)

  const onClick = useCallback(event => {
    const tag = event.target.hash.slice(1)

    event.preventDefault()
    setSearch(search => join(toggle(split(search), tag)))
  }, [setSearch])

  if (!tags) {
    return null
  }

  return (tags && <div className='tag-list'>{
    tags.map(tag => <a
      {...props}
      onClick={onClick}
      key={tag}
      href={`#${tag}`}>{tag}</a>)
  }</div>)
}
