import React, { useMemo } from 'react'

export function createProvider (Context, hookFactory, ...args) {
  return function StorageProvider (props) {
    const [state, update] = hookFactory(...args)
    const hook = useMemo(() => [state, update], [state, update])

    return <Context.Provider value={hook} {...props} />
  }
}
