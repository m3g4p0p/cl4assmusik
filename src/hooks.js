import { useState, useEffect } from 'react'

export function useStoredState (key, initial) {
  const [state, setState] = useState(() => {
    const value = window.localStorage.getItem(key)

    if (value !== null) {
      return JSON.parse(value)
    }

    if (typeof initial === 'function') {
      return initial()
    }

    return initial
  })

  useEffect(() => {
    const handle = window.requestIdleCallback(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
    })

    return () => window.cancelIdleCallback(handle)
  }, [key, state])

  return [state, setState]
}
