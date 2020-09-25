import React, { useContext } from 'react'
import { FavoritesContext } from '../lib/favorites'
import { ToggleButton } from '../toggle-button/toggle-button'
import { FavoriteIcon } from '../favorite-icon/favorite-icon'
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
    >
      <FavoriteIcon active={active} />
    </ToggleButton>
  )
}
