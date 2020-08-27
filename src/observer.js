import { useRef, useEffect, useCallback, useState } from 'react'

export function useObservedRef (observer) {
  const ref = useRef()

  useEffect(() => {
    const { current } = ref

    if (!current || !observer) {
      return
    }

    observer.observe(current)
    return () => observer.unobserve(current)
  }, [ref, observer])

  return ref
}

export function useObserver (options) {
  const [observer, setObserver] = useState(null)
  const [intersecting, setIntersecting] = useState(null)

  const isIntersecting = useCallback(ref => {
    return intersecting !== null && intersecting.has(ref.current)
  }, [intersecting])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setIntersecting(intersecting => {
        intersecting = intersecting || new Set()

        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            intersecting.add(target)
          } else {
            intersecting.delete(target)
          }
        })

        return new Set(intersecting.values())
      })
    }, options)

    setObserver(observer)

    return () => {
      observer.disconnect()
      setObserver(null)
      setIntersecting(null)
    }
  }, [options])

  return [observer, isIntersecting]
}
