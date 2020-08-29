import { useRef, useEffect, useState } from 'react'
import { Observer } from './lib'

export function useObservedRef (observer) {
  const ref = useRef()
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const { current } = ref

    if (!current || !observer) {
      return
    }

    observer.observe(current, ({ isIntersecting }) => {
      setIsIntersecting(isIntersecting)
    })

    return () => observer.unobserve(current)
  }, [ref, observer])

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
