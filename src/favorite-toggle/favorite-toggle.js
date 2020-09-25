import React, { useContext } from 'react'
import { FavoritesContext } from '../lib/favorites'
import { ToggleButton } from '../toggle-button/toggle-button'
import './favorite-toggle.scss'

export function FavoriteToggle ({ active, type, payload, ...props }) {
  const [, dispatch] = useContext(FavoritesContext)

  return (
    <ToggleButton
      className='favorite-toggle'
      {...props}
      update={() => {
        dispatch({ type, payload })
      }}
    >{active ? '\u2605' : '\u2606'}</ToggleButton>
  )
}
