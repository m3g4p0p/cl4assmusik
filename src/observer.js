import { useRef, useEffect, useCallback, useState } from 'react'

export function useObservedRef ([observer, isIntersecting]) {
  const ref = useRef()

  useEffect(() => {
    const { current } = ref

    if (!current || !observer) {
      return
    }

    observer.observe(current)
    return () => observer.unobserve(current)
  }, [ref, observer])

  return [ref, isIntersecting(ref)]
}

export function useObserver (options) {
  const [observer, setObserver] = useState(null)
  const [intersecting, setIntersecting] = useState(null)

  const isIntersecting = useCallback(ref => (
    intersecting !== null &&
    intersecting.has(ref.current)
  ), [intersecting])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      setIntersecting(current => {
        const intersecting = new Set(current)

        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            intersecting.add(target)
          } else {
            intersecting.delete(target)
          }
        })

        return intersecting
      })
    }, options)

    // const { unobserve } = observer

    // observer.unobserve = target => {
    //   unobserve.call(observer, target)

    //   setIntersecting(current => {
    //     const intersecting = new Set(current)
    //     intersecting.delete(target)
    //     return intersecting
    //   })
    // }

    setObserver(observer)

    return () => {
      observer.disconnect()
      setObserver(null)
      setIntersecting(null)
    }
  }, [options])

  return [observer, isIntersecting]
}
