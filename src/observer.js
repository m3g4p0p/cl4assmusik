import { useRef, useEffect, useState } from 'react'
import { Observer } from './lib'

export function useObservedRef (observer, once) {
  const ref = useRef()
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const { current } = ref

    if (!current || !observer) {
      return
    }

    observer.observe(current, ({ isIntersecting }) => {
      setIsIntersecting(isIntersecting)
    }, once)

    return () => observer.unobserve(current)
  }, [ref, observer, once])

  return [ref, isIntersecting]
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
