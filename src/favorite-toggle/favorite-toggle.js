import React from 'react'
import { ToggleButton } from '../toggle-button/toggle-button'
import './favorite-toggle.scss'

export function FavoriteToggle ({ hook, ...props }) {
  const [isFavorite] = hook

  return (
    <ToggleButton
      className='favorite-toggle'
      hook={hook}
    >{isFavorite ? '\u2605' : '\u2606'}</ToggleButton>
  )
}
