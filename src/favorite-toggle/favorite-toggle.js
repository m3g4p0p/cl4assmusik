import React from 'react'
import { ToggleButton } from '../toggle-button/toggle-button'
import './favorite-toggle.scss'

export function FavoriteToggle ({ active, update, ...props }) {
  return (
    <ToggleButton
      className='favorite-toggle'
      update={update}
    >{active ? '\u2605' : '\u2606'}</ToggleButton>
  )
}
