import { useState, useEffect } from 'react'

function parseFromStorage (key) {
  const value = window.localStorage.getItem(key)
  return value && JSON.parse(value)
}

export function useStoredState (key, initial) {
  const [state, setState] = useState(parseFromStorage(key) || initial)

  useEffect(() => {
    const idleHandle = window.requestIdleCallback(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
    })

    return () => window.cancelIdleCallback(idleHandle)
  }, [key, state])

  useEffect(() => {
    const handleUpdate = event => {
      if (event.key === key) {
        setState(event.newValue)
      }
    }

    window.addEventListener('storage', handleUpdate)
    return window.removeEventListener('storage', handleUpdate)
  }, [key])

  return [state, setState]
}
