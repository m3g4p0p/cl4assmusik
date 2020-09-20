export function favoritesReducer ({ favorites, show }, action) {
  switch (action.type) {
    case 'add':
      return { favorites: [...favorites, action.id], show }

    case 'remove':
      return { favorites: favorites.filter(id => id !== action.id), show }

    case 'toggle':
      return { favorites, show: !show }

    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}
