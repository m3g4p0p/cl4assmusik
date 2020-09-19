import React, { useCallback, useContext } from 'react'
import { SearchContext } from '../app'
import { split, toggle, assemble } from '../lib/util'
import './tag-list.scss'

export function TagList ({ tags, ...props }) {
  const [, setSearch] = useContext(SearchContext)

  const onClick = useCallback(event => {
    const tag = event.target.hash

    event.preventDefault()
    setSearch(search => assemble(toggle(split(search), tag)))
  }, [setSearch])

  return tags ? (
    <div className='tag-list'>{
      tags.map(tag => <a
        {...props}
        onClick={onClick}
        key={tag}
        href={tag}>{tag}</a>)
    }
    </div>
  ) : null
}
