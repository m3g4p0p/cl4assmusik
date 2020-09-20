import React from 'react'

export function createProvider (Context, hookFactory, ...args) {
  return function StorageProvider (props) {
    const [state, setState] = hookFactory(...args)
    return <Context.Provider value={[state, setState]} {...props} />
  }
}
