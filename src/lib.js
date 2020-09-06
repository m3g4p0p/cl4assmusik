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

export class Observer extends IntersectionObserver {
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

export function toggle (list, item) {
  const filtered = list.filter(current => current !== item)

  if (filtered.length < list.length) {
    return filtered
  }

  return list.concat([item])
}

export function join (values, separator = ' ') {
  return values.map(value => Array.isArray(value)
    ? join(value, separator)
    : value
  ).join(separator)
}

export function split (value) {
  return value.split(/\s+/)
}

export function searchList (list, keys, search) {
  const patters = split(search).map(term => new RegExp(term, 'i'))

  return list.filter(item => {
    const value = join(keys.map(key => item[key]))
    return patters.every(pattern => pattern.test(value))
  })
}

export function assemble (...values) {
  return join(values.filter(Boolean)).trim()
}
