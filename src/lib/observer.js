import { useRef, useEffect, useState } from 'react'

function dispatch (entries) {
  entries.forEach(entry => {
    const { target, isIntersecting } = entry
    const { callback, once } = this.callbacks.get(target) || {}

    if (callback) {
      callback(entry, this)

      if (once && isIntersecting) {
        this.unobserve(target)
      }
    }
  })
}

function makeObserver (BaseObserver) {
  return class extends BaseObserver {
    callbacks = new Map()

    constructor (options) {
      super(dispatch, options)
    }

    observe (target, callback, once = false) {
      this.callbacks.set(target, { callback, once })
      return super.observe(target)
    }

    unobserve (target) {
      this.callbacks.delete(target)
      return super.unobserve(target)
    }

    disconnect () {
      this.callbacks.clear()
      return super.disconnect()
    }

    takeRecords () {
      const records = super.takeRecords()
      dispatch.call(this, records)
      return records
    }
  }
}

export const IntersectionObserver = makeObserver(window.IntersectionObserver)
export const ResizeObserver = makeObserver(window.ResizeObserver)

export function useObserver (Observer, options) {
  const [observer, setObserver] = useState(null)

  useEffect(() => {
    const observer = new Observer(options)
    setObserver(observer)
    return () => observer.disconnect()
  }, [Observer, options])

  return observer
}

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
