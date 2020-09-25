import { createContext } from 'react'
import { createProvider } from './provider'
import { useStoredReducer } from './storage'
import { toggle } from './util'

function favoritesReducer (state, action) {
  const { show, ids } = state
  const { type, payload } = action

  switch (type) {
    case 'toggle_id':
      return {
        show,
        ids: toggle(ids, payload)
      }

    case 'toggle_show':
      return {
        show: !show,
        ids
      }

    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}

export function isFavorite (favorites, id) {
  return favorites.ids.includes(id)
}

export function filterFavorites (favorites, albums) {
  return favorites.show ? albums.filter(id => isFavorite(favorites, id)) : albums
}

export const FavoritesContext = createContext(null)

export const FavoritesProvider = createProvider(
  FavoritesContext,
  useStoredReducer,
  favoritesReducer,
  'favorites',
  { show: false, ids: [] }
)
