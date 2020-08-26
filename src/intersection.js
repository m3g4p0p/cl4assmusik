import { useState, useCallback, useEffect } from 'react'

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
