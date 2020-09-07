import { useRef, useEffect, useState } from 'react'
import { Observer } from './lib'

export function useObservedRef (observer, once) {
  const ref = useRef()
  const [entry, setEntry] = useState({})

  useEffect(() => {
    const { current } = ref

    if (!current || !observer) {
      return
    }

    observer.observe(current, setEntry, once)
    return () => observer.unobserve(current)
  }, [ref, observer, once])

  return [ref, entry]
}

export function useObserver (options) {
  const [observer, setObserver] = useState(null)

  useEffect(() => {
    const observer = new Observer(options)
    setObserver(observer)

    return () => {
      observer.disconnect()
      setObserver(null)
    }
  }, [options])

  return observer
}
