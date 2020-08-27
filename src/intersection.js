import { useState, useCallback, useEffect, useRef } from 'react'

export function useIntersection (ref) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const callback = useCallback(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (target === ref.current) {
        setIsIntersecting(isIntersecting)
      }
    })
  }, [ref])

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(callback)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, callback])

  return isIntersecting
}

export function useSubscription (subscribe) {
  const [state, setState] = useState()

  useEffect(() => {
    return subscribe(setState)
  }, [subscribe])

  return state
}

export function useObserver (options = {}) {
  const [observer, setObserver] = useState(null)
  const refs = useRef(new Map())

  const callback = useCallback(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      const callback = refs.current.get(target)

      if (callback) {
        callback(isIntersecting)
      }
    })
  }, [refs])

  const observe = useCallback((ref, callback) => {
    if (!observer || !ref.current) {
      return
    }

    observer.observe(ref.current)
    refs.current.set(ref.current, callback)

    return () => {
      observer.unobserve(ref.current)
      refs.current.delete(ref.current)
    }
  }, [observer, refs])

  useEffect(() => {
    const observer = new MutationObserver(callback, options)
    setObserver(observer)

    return () => {
      observer.disconnect()
      setObserver(null)
    }
  }, [callback, options])

  return observe
}
