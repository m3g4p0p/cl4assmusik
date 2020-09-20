import { useState, useEffect, useReducer } from 'react'

function resolveKey (key) {
  if (typeof key === 'string') {
    return key
  }

  const [prefix, id] = key
  return `${prefix}_${id}`
}

function getItem (key) {
  const value = window.localStorage.getItem(key)
  return value && JSON.parse(value)
}

function setItem (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function useStoredState (key, initial) {
  const prefixed = resolveKey(key)
  const [state, setState] = useState(getItem(prefixed) || initial)

  useEffect(() => {
    const idleHandle = window.requestIdleCallback(() => {
      setItem(prefixed, state)
    })

    return () => window.cancelIdleCallback(idleHandle)
  }, [prefixed, state])

  return [state, setState]
}

export function useStoredDispatch (reducer, key, initial) {
  const [stored, setStored] = useStoredState(key, initial)
  const [state, dispatch] = useReducer(stored)

  useEffect(() => {
    setStored(state)
  }, [state, setStored])

  return [state, dispatch]
}
