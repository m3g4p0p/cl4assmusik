export function favoritesReducer (favorites, action) {
  switch (action.type) {
    case 'add':
      return [...favorites, action.id]

    case 'remove':
      return favorites.filter(id => id !== action.id)

    default:
      throw new Error(`Invalid action ${action.type}`)
  }
}
