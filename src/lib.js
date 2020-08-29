function dispatch (entries) {
  entries.forEach(entry => {
    const { target, isIntersecting } = entry
    const callback = this.callbacks.get(target)

    if (callback) {
      callback(entry, this)

      if (this.once && isIntersecting) {
        this.unobserve(target)
      }
    }
  })
}

export class Observer extends IntersectionObserver {
  callbacks = new Map()

  constructor ({ once = false, ...options } = {}) {
    super(dispatch, options)
    this.once = once
  }

  observe (target, callback) {
    this.callbacks.set(target, callback)
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

function joinRecursive (values, separator) {
  return values.map(value => Array.isArray(value)
    ? joinRecursive(value, separator)
    : value
  ).join(separator)
}

export function searchList (list, keys, search) {
  const patters = search.split(/\s+/).map(term => new RegExp(term, 'i'))

  return list.filter(item => {
    const value = joinRecursive(keys.map(key => item[key]), ' ')
    return patters.every(pattern => pattern.test(value))
  })
}

export function assemble (...values) {
  return values.filter(v => v).join(' ')
}
