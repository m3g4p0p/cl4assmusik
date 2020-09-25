import React from 'react'

export function FavoriteIcon ({ active }) {
  return <span className='favorite-icon'>{active ? '\u2605' : '\u2606'}</span>
}
